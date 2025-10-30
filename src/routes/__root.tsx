import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toast } from "../components/toast/toast-function";
import type { AuthContextType } from "../context/auth/auth-context";
import { LanguageSwitcher } from "../components/language-switcher/language-switcher";

interface MyRouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <LanguageSwitcher />
      <Toast />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  ),
});
