import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Home,
  LogOut,
  MessageCircle,
  Microscope,
  ShoppingCart,
  Sprout,
  X,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  labelKey: keyof ReturnType<typeof useLanguage>["t"];
}

const navItems: NavItem[] = [
  { to: "/", icon: Home, labelKey: "nav_home" },
  { to: "/soil", icon: FlaskConical, labelKey: "nav_soil" },
  { to: "/planner", icon: Calendar, labelKey: "nav_planner" },
  { to: "/health", icon: Microscope, labelKey: "nav_health" },
  { to: "/mandi", icon: ShoppingCart, labelKey: "nav_mandi" },
  { to: "/chatbot", icon: MessageCircle, labelKey: "nav_chatbot" },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useLanguage();
  const { logout, user, isGuest } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate({ to: "/welcome" });
    onClose();
  }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          role="button"
          tabIndex={0}
          className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm md:hidden"
          onClick={onClose}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
          aria-label="Close navigation"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed md:relative z-50 md:z-auto flex flex-col h-full bg-card border-r border-border transition-all duration-300 shadow-elevation md:shadow-none",
          collapsed ? "md:w-16" : "md:w-64",
          mobileOpen ? "left-0 w-72" : "-left-72 md:left-0",
        )}
        data-ocid="sidebar"
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border min-h-[64px]">
          <div
            className={cn(
              "flex items-center gap-2.5",
              collapsed && "md:hidden",
            )}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-foreground text-sm leading-tight">
              {t.farmer_brain}
            </span>
          </div>
          {collapsed && (
            <div className="hidden md:flex w-full justify-center">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sprout className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          )}
          {/* Mobile close */}
          <button
            type="button"
            className="md:hidden p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
            onClick={onClose}
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User info badge */}
        {!collapsed && (
          <div className="px-4 py-3 border-b border-border bg-muted/40">
            {isGuest ? (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-secondary/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">👤</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    Guest
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Limited access
                  </p>
                </div>
              </div>
            ) : user ? (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {user.location}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Nav links */}
        <nav
          className="flex-1 py-3 overflow-y-auto"
          aria-label="Main navigation"
        >
          {navItems.map(({ to, icon: Icon, labelKey }) => {
            const isActive =
              to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                data-ocid={`nav-${String(labelKey).replace("nav_", "")}`}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-smooth group",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                title={collapsed ? String(t[labelKey]) : undefined}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
                <span className={cn("truncate", collapsed && "md:hidden")}>
                  {String(t[labelKey])}
                </span>
                {isActive && !collapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className="border-t border-border p-2">
          <button
            type="button"
            onClick={handleLogout}
            data-ocid="logout-btn"
            className={cn(
              "flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-smooth group",
            )}
            title={collapsed ? t.auth_logout : undefined}
            aria-label={t.auth_logout}
          >
            <LogOut className="w-5 h-5 flex-shrink-0 group-hover:text-destructive transition-colors" />
            <span className={cn("truncate", collapsed && "md:hidden")}>
              {t.auth_logout}
            </span>
          </button>
        </div>

        {/* Collapse toggle (desktop only) */}
        <button
          type="button"
          className="hidden md:flex items-center justify-center py-3 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </aside>
    </>
  );
}
