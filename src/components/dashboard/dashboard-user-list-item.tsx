import type { User } from "../../context/auth/auth-context";

export function DashboardUserListItem({ user }: { user: User }) {
  return (
    <tr className="hover:bg-zinc-800">
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
  );
}
