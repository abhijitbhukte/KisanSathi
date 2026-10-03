import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/context/LanguageContext";
import { useLocationContext } from "@/context/LocationContext";
import { languageNames } from "@/data/translations";
import { useGetAlerts } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import type { Language } from "@/types";
import {
  Bell,
  Check,
  ChevronDown,
  Globe,
  Loader2,
  MapPin,
  Menu,
} from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { t, language, setLanguage } = useLanguage();
  const loc = useLocationContext();
  const { data: alerts } = useGetAlerts();
  const [alertsOpen, setAlertsOpen] = useState(false);

  const unreadCount = alerts?.filter((a) => !a.read_status).length ?? 0;

  return (
    <header
      className="sticky top-0 z-30 flex items-center gap-3 px-4 md:px-6 h-16 bg-card border-b border-border shadow-xs"
      data-ocid="header"
    >
      {/* Hamburger (mobile) */}
      <button
        type="button"
        className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
        onClick={onMenuToggle}
        aria-label="Toggle navigation"
        data-ocid="header-menu-toggle"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Location detection — uses shared LocationContext */}
      <Button
        variant="outline"
        size="sm"
        onClick={loc.detect}
        disabled={loc.loading}
        data-ocid="btn-auto-detect"
        className="gap-2 text-xs font-medium border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-smooth"
      >
        {loc.loading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <MapPin className="w-3.5 h-3.5" />
        )}
        <span className="hidden sm:inline">
          {loc.loading ? t.detecting : loc.detectedLocation}
        </span>
        <span className="sm:hidden">
          {loc.loading ? t.detecting : loc.city}
        </span>
      </Button>

      <div className="flex-1" />

      {/* Language selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            data-ocid="lang-selector"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{languageNames[language]}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          {(Object.keys(languageNames) as Language[]).map((lang) => (
            <DropdownMenuItem
              key={lang}
              onClick={() => setLanguage(lang)}
              className={cn(
                "gap-2 text-sm",
                language === lang && "text-primary font-medium",
              )}
              data-ocid={`lang-${lang}`}
            >
              {language === lang && <Check className="w-3.5 h-3.5" />}
              {language !== lang && <span className="w-3.5" />}
              {languageNames[lang]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Alerts bell */}
      <div className="relative">
        <button
          type="button"
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
          onClick={() => setAlertsOpen((o) => !o)}
          aria-label={t.alerts}
          data-ocid="btn-alerts"
        >
          <Bell className="w-[18px] h-[18px]" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 text-[10px] flex items-center justify-center bg-destructive text-destructive-foreground border-0 rounded-full">
              {unreadCount}
            </Badge>
          )}
        </button>

        {alertsOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 bg-card border border-border rounded-lg shadow-elevation z-50">
            <div className="px-4 py-3 border-b border-border">
              <p className="font-semibold text-sm text-foreground">
                {t.alerts}
              </p>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {alerts && alerts.length > 0 ? (
                alerts.slice(0, 5).map((a) => (
                  <div
                    key={a.alert_id.toString()}
                    className={cn(
                      "px-4 py-3 border-b border-border/50 text-sm",
                      !a.read_status && "bg-primary/5",
                    )}
                  >
                    <p className="text-foreground">{a.message}</p>
                    <p className="text-muted-foreground text-xs mt-0.5 capitalize">
                      {a.alert_type}
                    </p>
                  </div>
                ))
              ) : (
                <p className="px-4 py-4 text-sm text-muted-foreground">
                  {t.home_no_alerts}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
