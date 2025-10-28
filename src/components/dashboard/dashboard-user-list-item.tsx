import type { User } from "../../context/auth/auth-context";
import { Eye } from "lucide-react";
import { IconButton } from "../form/icon-button";

export function DashboardUserListItem({
  user,
  onClick,
  onViewHistory,
}: {
  user: User;
  onClick: () => void;
  onViewHistory: () => void;
}) {
  return (
    <tr className="hover:bg-zinc-800">
      <td className="py-3 px-4 text-sm cursor-pointer" onClick={onClick}>
        {user.name}
      </td>
      <td className="py-3 px-4 text-sm cursor-pointer" onClick={onClick}>
        {user.email}
      </td>
      <td className="py-3 px-4 text-sm cursor-pointer" onClick={onClick}>
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
      <td className="py-3 px-4 text-sm cursor-pointer" onClick={onClick}>
        {new Date(user.created_at).toLocaleDateString("pt-BR")}
      </td>
      <td className="py-3 px-4 text-sm cursor-pointer" onClick={onClick}>
        {user.updated_at
          ? new Date(user.updated_at).toLocaleDateString("pt-BR")
          : "N/A"}
      </td>
      <td className="py-3 px-4 text-sm">
        <div className="flex justify-between items-center gap-3">
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
              user.deactivated
                ? "bg-red-300 text-red-900"
                : "bg-green-300 text-green-900"
            }`}
          >
            {user.deactivated ? "Deactivated" : "Active"}
          </span>

          <IconButton onClick={onViewHistory} icon={Eye} text="View History" />
        </div>
      </td>
    </tr>
  );
}
