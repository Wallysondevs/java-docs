import { Link } from "wouter";
import { GraduationCap, BookText, Cpu, Wrench, Coffee } from "lucide-react";
import manifest from "@/manifest.json";

const CARDS = [
  {
    href: "/doc/tutorials/getting-started",
    icon: GraduationCap,
    title: "Tutoriais",
    desc: "Aprenda Java do zero: sintaxe, classes, lambdas, streams, generics, modulos, I/O e mais.",
  },
  {
    href: "/doc/jls/jls-01",
    icon: BookText,
    title: "Especificacao da Linguagem (JLS)",
    desc: "A referencia formal da linguagem Java: tipos, expressoes, classes, interfaces, pattern matching.",
  },
  {
    href: "/doc/jvms/jvms-01",
    icon: Cpu,
    title: "Especificacao da JVM (JVMS)",
    desc: "Como a maquina virtual funciona: formato .class, bytecode, carregamento e vinculacao.",
  },
  {
    href: "/doc/guides/migrate/index",
    icon: Wrench,
    title: "Guias do JDK",
    desc: "Migracao, seguranca, ferramentas (java, javac, jar...), troubleshooting, JShell, monitoramento.",
  },
];

export default function Home() {
  const total = (manifest as any).total;
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <Coffee className="w-14 h-14 text-[hsl(var(--nix-orange))] mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-[hsl(var(--nix-blue))] mb-3">
          Documentacao Oficial do Java 25
        </h1>
        <p className="text-lg text-[hsl(var(--nix-dim))]">
          Toda a documentacao oficial da Oracle e dev.java, traduzida para portugues brasileiro.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="block p-5 rounded-lg border border-[hsl(var(--nix-blue))]/20 bg-[hsl(var(--nix-bg-2))] hover:border-[hsl(var(--nix-blue))]/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-5 h-5 text-[hsl(var(--nix-orange))]" />
                <h3 className="font-mono font-bold text-[hsl(var(--nix-blue))] m-0">{c.title}</h3>
              </div>
              <p className="text-sm text-[hsl(var(--nix-dim))] m-0">{c.desc}</p>
            </Link>
          );
        })}
      </div>

      <div className="p-4 rounded-lg border border-[hsl(var(--nix-purple))]/20 bg-[hsl(var(--nix-bg-2))]">
        <p className="text-sm text-[hsl(var(--nix-fg))]/80 m-0">
          <strong className="text-[hsl(var(--nix-blue))]">{total} paginas</strong> da documentacao
          oficial do Java 25 (LTS) traduzidas via Vertex AI (Gemini 2.5 Flash). Inclui a Java Language
          Specification, a JVM Specification, os tutoriais do dev.java e os guias do JDK.
        </p>
        <p className="text-xs text-[hsl(var(--nix-dim))] mt-2 mb-0">
          Use a busca na barra lateral para encontrar qualquer topico rapidamente.
        </p>
      </div>
    </div>
  );
}
