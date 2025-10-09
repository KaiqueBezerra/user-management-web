import { useNavigate, useRouter } from "@tanstack/react-router";
import { useUsers } from "../../http/use-users";
import { toast } from "../toast/toast";
import { useAuth } from "../../context/auth/use-auth";
import { Button } from "../form/button";
import { useEffect, useState } from "react";
import CreateUserCard from "../cards/create-user-card/create-user-card";
import { Spin } from "../spin/spin";

export function DashboardComponent() {
  const { user, logout } = useAuth();

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useUsers(page, limit);
  const users = data?.users ?? [];

  const [showCreateUserCard, setShowCreateUserCard] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const router = useRouter();
  const navigate = useNavigate();

  const handleCreateUserClick = () => setShowCreateUserCard(true);
  const handleCloseUserCard = () => setShowCreateUserCard(false);

  function handleLogout() {
    logout();
    router.invalidate().finally(() => {
      navigate({ to: "/" });
    });
    toast.success("Logout successful!");
  }

  useEffect(() => {
    if (user) setLoadingUser(false);
  }, [user]);

  if (loadingUser || isLoading) {
    return <Spin />;
  }

  console.log(users)

  return (
    <section className="grid gap-6 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-zinc-400">Welcome, {user?.name}!</p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="primary"
            onClick={handleCreateUserClick}
            text="Create"
          />
          <Button variant="danger" onClick={handleLogout} text="Logout" />
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">User List</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-zinc-900">
            <thead className="bg-zinc-800">
              <tr>
                <th className="py-2 px-4 text-left text-sm font-medium">
                  Name
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium">
                  Email
                </th>
                <th className="py-2 px-4 text-left text-sm font-medium">
                  Role
                </th>
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
                <tr key={user.id} className="hover:bg-zinc-800">
                  <td className="py-3 px-4 text-sm">{user.name}</td>
                  <td className="py-3 px-4 text-sm">{user.email}</td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-300 text-purple-900"
                          : "bg-blue-300 text-blue-900"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {new Date(user.created_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    {user.updated_at
                      ? new Date(user.updated_at).toLocaleDateString("pt-BR")
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-zinc-400">
            Page {data?.page} of {data?.totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="primary"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              text="Previous"
              disabled={page === 1}
              className="py-1 text-sm"
            />
            <Button
              variant="primary"
              onClick={() =>
                setPage((p) => Math.min(p + 1, data?.totalPages || p))
              }
              text="Next"
              disabled={page === data?.totalPages}
              className="py-1 text-sm"
            />
          </div>
        </div>
      </div>

      {showCreateUserCard && <CreateUserCard onClose={handleCloseUserCard} />}
    </section>
  );
}
