import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "./context/auth/use-auth";
import { router } from "./main";

export function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}
