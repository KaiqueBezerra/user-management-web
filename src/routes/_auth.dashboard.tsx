import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useAuth } from "../context/auth/use-auth";
import { Button } from "../components/form/button";
import { toast } from "../components/toast/toast";

export const Route = createFileRoute("/_auth/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user, logout } = useAuth();

  const router = useRouter();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    router.invalidate().finally(() => {
      navigate({ to: "/" });
    });
    toast.success("Logout successful!");
  }

  return (
    <section className="grid gap-2 p-2">
      <p>Hi {user?.name}!</p>
      <p>You are currently on the dashboard route.</p>
      <Button variant="danger" onClick={handleLogout} text="Logout" />
    </section>
  );
}
