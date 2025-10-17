import { useEffect, useRef, useState } from "react";
import { Button } from "../../form/button";
import type { User } from "../../../context/auth/auth-context";
import { X } from "lucide-react";
import { UserDetailsEditModal } from "./user-details-edit-modal/user-details-edit-modal";

type UserDetailsModalProps = {
  user: User;
  onClose: () => void;
};

export function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-zinc-950 border border-zinc-700 rounded-lg shadow-xl w-full max-w-2xl"
        ref={modalRef}
      >
        <div className="flex justify-between items-center border-b border-zinc-700 p-4">
          <h2 className="text-xl font-semibold">User Details</h2>
          <button
            onClick={onClose}
            className="text-white cursor-pointer top-4 right-4 hover:text-zinc-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {isEditing ? (
            <UserDetailsEditModal
              setIsEditing={setIsEditing}
              user={user}
              onClose={onClose}
            />
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-zinc-400">ID</h3>
                  <p className="mt-1 text-sm text-white">{user.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-400">Status</h3>
                  <p className="mt-1">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        user.deactivated
                          ? "bg-red-300 text-red-900"
                          : "bg-green-300 text-green-900"
                      }`}
                    >
                      {user.deactivated ? "Deactivated" : "Active"}
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-400">Name</h3>
                  <p className="mt-1 text-sm text-white">{user.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-400">Email</h3>
                  <p className="mt-1 text-sm text-white">{user.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-400">Role</h3>
                  <p className="mt-1">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-300 text-purple-900"
                          : "bg-blue-300 text-blue-900"
                      }`}
                    >
                      {user.role === "admin" ? "Admin" : "User"}
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-400">
                    Created At
                  </h3>
                  <p className="mt-1 text-sm text-white">
                    {new Date(user.created_at).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-400">
                    Updated At
                  </h3>
                  <p className="mt-1 text-sm text-white">
                    {user.updated_at
                      ? new Date(user.updated_at).toLocaleDateString("pt-BR")
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="border-t border-zinc-700 pt-4">
                <h3 className="text-sm font-medium text-zinc-300 mb-3">
                  Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    text="Edit User"
                    onClick={() => setIsEditing(true)}
                  />
                  {user.deactivated ? (
                    <Button
                      variant="secondary"
                      text="Reactivate User"
                      onClick={() => {}}
                    />
                  ) : (
                    <Button
                      variant="warning"
                      text="Deactivate User"
                      onClick={() => {}}
                    />
                  )}
                  <Button
                    variant="danger"
                    text="Delete User"
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
