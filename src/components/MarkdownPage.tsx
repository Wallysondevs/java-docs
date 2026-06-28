import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export function MarkdownPage({ path }: { path: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const base = import.meta.env.BASE_URL;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    window.scrollTo(0, 0);

    // Tenta o path exato e algumas variacoes comuns
    const clean = path.replace(/^\/+/, "");
    const v = (import.meta.env.VITE_BUILD_ID as string) || "1";
    const tryPaths = [
      `${base}docs/${clean}?v=${v}`,
      `${base}docs/${clean.replace(/\.md$/, "/index.md")}?v=${v}`,
    ];

    const tryNext = (i: number) => {
      if (cancelled) return;
      if (i >= tryPaths.length) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      fetch(tryPaths[i], { cache: "no-cache" })
        .then((r) =>
          r.ok
            ? r.text().then((t) => {
                if (cancelled) return;
                // valida que nao recebeu o index.html (SPA fallback)
                if (t.trimStart().startsWith("<!DOCTYPE") || t.trimStart().startsWith("<html")) {
                  tryNext(i + 1);
                  return;
                }
                setContent(t);
                setLoading(false);
              })
            : tryNext(i + 1)
        )
        .catch(() => tryNext(i + 1));
    };
    tryNext(0);
    return () => {
      cancelled = true;
    };
  }, [path, base]);

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        <div className="h-8 w-2/3 bg-white/5 rounded" />
        <div className="h-4 w-full bg-white/5 rounded" />
        <div className="h-4 w-5/6 bg-white/5 rounded" />
        <div className="h-4 w-4/6 bg-white/5 rounded" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="prose">
        <h1>Pagina nao encontrada</h1>
        <p className="text-[hsl(var(--nix-dim))]">
          O documento <code>{path}</code> nao existe nesta documentacao.
        </p>
        <a href="#/" className="text-[hsl(var(--nix-blue))]">← Voltar ao inicio</a>
      </div>
    );
  }

  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
