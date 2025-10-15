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
  return (
    <div className="flex gap-2 items-center">
      <select
        value={deactivated}
        onChange={(e) =>
          setDeactivated(e.target.value as "true" | "false" | "all")
        }
        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm"
      >
        <option value="all">All</option>
        <option value="true">Deactivated</option>
        <option value="false">Active</option>
      </select>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value as "admin" | "user" | "all")}
        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm"
      >
        <option value="all">All</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value as "created_at" | "updated_at")
        }
        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm"
      >
        <option value="created_at">Created At</option>
        <option value="updated_at">Updated At</option>
      </select>

      <select
        value={order}
        onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
        className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-sm"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
