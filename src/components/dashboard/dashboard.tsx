import { useNavigate, useRouter } from "@tanstack/react-router";
import { useUsers } from "../../http/use-users";
import { toast } from "../toast/toast";
import { useAuth } from "../../context/auth/use-auth";
import { Button } from "../form/button";

export function DashboardComponent() {
  const { user, logout } = useAuth();
  const { data: users, isLoading } = useUsers();

  const router = useRouter();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    router.invalidate().finally(() => {
      navigate({ to: "/" });
    });
    toast.success("Logout successful!");
  }

  if (!user) {
    return null;
  }

  return (
    <section className="grid gap-6 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-zinc-400">Bem-vindo, {user?.name}!</p>
        </div>
        <Button variant="danger" onClick={handleLogout} text="Logout" />
      </div>

      <div className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Lista de Usuários</h2>

        {isLoading ? (
          <p className="text-zinc-500">Carregando usuários...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-zinc-900">
              <thead className="bg-zinc-800">
                <tr>
                  <th className="py-2 px-4 text-left text-sm font-medium">
                    Nome
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium">
                    Email
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium">
                    Função
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium">
                    Data de Criação
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700">
                {users?.map((user) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
