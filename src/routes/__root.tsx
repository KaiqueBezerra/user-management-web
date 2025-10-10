import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toast } from "../components/toast/toast-function";
import type { AuthContextType } from "../context/auth/auth-context";

interface MyRouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <Toast />
      <TanStackRouterDevtools position="bottom-left" initialIsOpen={false} />
    </>
  ),
});
