import { useState, type SetStateAction } from "react";
import type { User } from "../../context/auth/auth-context";
import { DashboardPagination } from "./dashboard-pagination";
import { DashboardUserListItem } from "./dashboard-user-list-item";
import { DashboardFilters } from "./dashboard-filters";
import { UserDetailsModal } from "../modals/user-details-modal/user-details-modal";
import { UserDeactivationHistoryModal } from "../modals/user-deactivation-history-modal/user-deactivation-history-modal";

import { useTranslation } from "react-i18next";

export function DashboardUserList({
  users,
  page,
  totalPages,
  setPage,
  sortBy,
  order,
  setSortBy,
  setOrder,
  role,
  setRole,
  deactivated,
  setDeactivated,
}: {
  users: User[];
  page: number | undefined;
  totalPages: number | undefined;
  setPage: (value: SetStateAction<number>) => void;
  sortBy: "created_at" | "updated_at";
  order: "asc" | "desc";
  setSortBy: (value: "created_at" | "updated_at") => void;
  setOrder: (value: "asc" | "desc") => void;
  role: "user" | "admin" | "all";
  setRole: (value: "user" | "admin" | "all") => void;
  deactivated: "true" | "false" | "all";
  setDeactivated: (value: "true" | "false" | "all") => void;
}) {
  const { t } = useTranslation("dashboardUserList");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [historyUser, setHistoryUser] = useState<User | null>(null);

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{t("title")}</h2>

        <DashboardFilters
          sortBy={sortBy}
          setSortBy={setSortBy}
          order={order}
          setOrder={setOrder}
          role={role}
          setRole={setRole}
          deactivated={deactivated}
          setDeactivated={setDeactivated}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-zinc-900">
          <thead className="bg-zinc-800">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-medium">
                {t("name")}
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                {t("email")}
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                {t("role")}
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                {t("createdAt")}
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                {t("updatedAt")}
              </th>
              <th className="py-2 px-4 text-left text-sm font-medium">
                {t("status")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {users.map((user) => (
              <DashboardUserListItem
                key={user.id}
                user={user}
                onClick={() => setSelectedUser(user)}
                onViewHistory={() => setHistoryUser(user)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <DashboardPagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {historyUser && (
        <UserDeactivationHistoryModal
          user={historyUser}
          onClose={() => setHistoryUser(null)}
        />
      )}
    </div>
  );
}
