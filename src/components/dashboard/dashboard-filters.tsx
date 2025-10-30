import { useTranslation } from "react-i18next";

export function DashboardFilters({
  sortBy,
  setSortBy,
  order,
  setOrder,
  role,
  setRole,
  deactivated,
  setDeactivated,
}: {
  sortBy: "created_at" | "updated_at";
  setSortBy: (sortBy: "created_at" | "updated_at") => void;
  order: "asc" | "desc";
  setOrder: (order: "asc" | "desc") => void;
  role: "user" | "admin" | "all";
  setRole: (role: "user" | "admin" | "all") => void;
  deactivated: "true" | "false" | "all";
  setDeactivated: (deactivated: "true" | "false" | "all") => void;
}) {
  const { t } = useTranslation("dashboardFilters");

  return (
    <div className="flex gap-2 items-center">
      <select
        value={deactivated}
        onChange={(e) =>
          setDeactivated(e.target.value as "true" | "false" | "all")
        }
        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm"
      >
        <option value="all">{t("deactivated.all")}</option>
        <option value="true">{t("deactivated.deactivated")}</option>
        <option value="false">{t("deactivated.active")}</option>
      </select>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value as "admin" | "user" | "all")}
        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm"
      >
        <option value="all">{t("role.all")}</option>
        <option value="user">{t("role.user")}</option>
        <option value="admin">{t("role.admin")}</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value as "created_at" | "updated_at")
        }
        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm"
      >
        <option value="created_at">{t("sortBy.created_at")}</option>
        <option value="updated_at">{t("sortBy.updated_at")}</option>
      </select>

      <select
        value={order}
        onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm"
      >
        <option value="asc">{t("order.asc")}</option>
        <option value="desc">{t("order.desc")}</option>
      </select>
    </div>
  );
}
