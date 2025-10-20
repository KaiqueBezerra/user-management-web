import { createFileRoute } from "@tanstack/react-router";
import { DashboardComponent } from "../components/dashboard/dashboard";

type DashboardSearch = {
  page?: number;
  sortBy?: "created_at" | "updated_at";
  order?: "asc" | "desc";
  role?: "admin" | "user" | "all";
  deactivated?: "true" | "false" | "all";
};

export const Route = createFileRoute("/_auth/dashboard")({
  component: DashboardPage,

  validateSearch: (search: DashboardSearch) => {
    return {
      page: Number(search.page ?? 1),
      sortBy: search.sortBy ?? "created_at",
      order: search.order ?? "desc",
      role: search.role ?? "all",
      deactivated: search.deactivated ?? "all",
    };
  },
});

function DashboardPage() {
  return <DashboardComponent />;
}
