import { ChatbotWidget } from "@/components/ChatbotWidget";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Sprout } from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header onMenuToggle={() => setMobileOpen((o) => !o)} />

        <main className="flex-1 overflow-y-auto" data-ocid="main-content">
          {children}
        </main>

        <footer className="border-t border-border bg-muted/40 px-6 py-3">
          <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5">
            <Sprout className="w-3.5 h-3.5 text-primary" />©{" "}
            {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>

      <ChatbotWidget />
    </div>
  );
}
