import { useAuth } from "@/context/AuthContext";
import { Navigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isGuest, isLoading } = useAuth();

  // Show loading screen while session is being restored (actor init + profile fetch)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="text-3xl animate-bounce">🌱</span>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Farmer Brain</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Loading your dashboard…
            </p>
          </div>
          <div className="flex gap-1.5 mt-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // user state is set synchronously inside login() before navigate() is called,
  // so by the time this renders after navigation, user should already be set.
  if (!user && !isGuest) {
    return <Navigate to="/welcome" />;
  }

  return <>{children}</>;
}
