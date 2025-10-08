import { createFileRoute } from "@tanstack/react-router";
import { DashboardComponent } from "../components/dashboard/dashboard";

export const Route = createFileRoute("/_auth/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return <DashboardComponent />;
}
