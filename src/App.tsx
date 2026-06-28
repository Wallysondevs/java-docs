import { useState } from "react";
import { Route, Switch, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MarkdownPage } from "@/components/MarkdownPage";
import Home from "@/pages/Home";

// Componente que recebe o path completo (wildcard) e monta o caminho do .md
function DocRoute({ params }: { params: { "*": string } }) {
  const wild = (params["*"] || "").replace(/\.md$/, "");
  return <MarkdownPage path={`${wild}.md`} key={wild} />;
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Router hook={useHashLocation}>
      <div className="min-h-screen" style={{ background: "hsl(var(--nix-bg))" }}>
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="lg:ml-72">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-6 max-w-5xl mx-auto">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/doc/*" component={DocRoute} />
              <Route>{() => <Home />}</Route>
            </Switch>
          </main>
        </div>
      </div>
    </Router>
  );
}
