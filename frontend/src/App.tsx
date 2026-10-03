import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { LocationProvider } from "@/context/LocationContext";
import { ChatbotPage } from "@/pages/ChatbotPage";
import { HealthPage } from "@/pages/HealthPage";
import { HomePage } from "@/pages/HomePage";
import { AuthPage } from "@/pages/AuthPage";
import { MandiPage } from "@/pages/MandiPage";
import { PlannerPage } from "@/pages/PlannerPage";
import { SoilPage } from "@/pages/SoilPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1 },
  },
});

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Single Auth Page route — toggles between Login and Signup via useState
const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/welcome",
  component: AuthPage,
});

// Protected route wrapper
function DashboardLayout() {
  return (
    <ProtectedRoute>
      <Layout>
        <Outlet />
      </Layout>
    </ProtectedRoute>
  );
}

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "dashboard",
  component: DashboardLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/",
  component: HomePage,
});
const soilRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/soil",
  component: SoilPage,
});
const plannerRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/planner",
  component: PlannerPage,
});
const healthRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/health",
  component: HealthPage,
});
const mandiRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/mandi",
  component: MandiPage,
});
const chatbotRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "/chatbot",
  component: ChatbotPage,
});

const routeTree = rootRoute.addChildren([
  authRoute,
  dashboardRoute.addChildren([
    homeRoute,
    soilRoute,
    plannerRoute,
    healthRoute,
    mandiRoute,
    chatbotRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <LocationProvider>
            <RouterProvider router={router} />
            <Toaster richColors position="top-right" />
          </LocationProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
