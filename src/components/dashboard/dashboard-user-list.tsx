import type { SetStateAction } from "react";
import type { User } from "../../context/auth/auth-context";
import { DashboardPagination } from "./dashboard-pagination";
import { DashboardUserListItem } from "./dashboard-user-list-item";
import { DashboardFilters } from "./dashboard-filters";

export function DashboardUserList({
  users,
  page,
  totalPages,
  setPage,
  sortBy,
  order,
  setSortBy,
  setOrder,
}: {
  users: User[];
  page: number | undefined;
  totalPages: number | undefined;
  setPage: (value: SetStateAction<number>) => void;
  sortBy: "created_at" | "updated_at";
  order: "asc" | "desc";
  setSortBy: (value: "created_at" | "updated_at") => void;
  setOrder: (value: "asc" | "desc") => void;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User List</h2>

        <DashboardFilters
          sortBy={sortBy}
          setSortBy={setSortBy}
          order={order}
          setOrder={setOrder}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-zinc-900">
          <thead className="bg-zinc-800">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium">Name</th>
              <th className="py-2 px-4 text-left text-sm font-medium">Email</th>
              <th className="py-2 px-4 text-left text-sm font-medium">Role</th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                Created At
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {users.map((user) => (
              <DashboardUserListItem key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      <DashboardPagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}
