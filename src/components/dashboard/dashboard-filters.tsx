export function DashboardFilters({
  sortBy,
  setSortBy,
  order,
  setOrder,
}: {
  sortBy: "created_at" | "updated_at";
  setSortBy: (sortBy: "created_at" | "updated_at") => void;
  order: "asc" | "desc";
  setOrder: (order: "asc" | "desc") => void;
}) {
  return (
    <div className="flex gap-2 items-center">
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
