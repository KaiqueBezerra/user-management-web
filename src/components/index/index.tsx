import { UserCog, UserPen, UserPlus } from "lucide-react";
import { useState } from "react";
import { IconButton } from "../form/icon-button";
import { useAuth } from "../../context/auth/use-auth";
import { useNavigate } from "@tanstack/react-router";
import { CreateUserModal } from "../modals/create-user-modal/create-user-modal";
import { LoginModal } from "../modals/login-modal/login-modal";

export function IndexComponent() {
  const { isAuthenticated } = useAuth();

  const [showCreateUserCard, setShowCreateUserCard] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);

  const navigate = useNavigate();

  const handleCreateUserClick = () => {
    setShowCreateUserCard(true);
  };

  const handleCloseUserModal = () => {
    setShowCreateUserCard(false);
  };

  const handleLoginClick = () => {
    setShowLoginCard(true);
  };

  const handleCloseLoginCard = () => {
    setShowLoginCard(false);
  };

  const handleNavigateToDashboard = () => {
    navigate({
      to: "/dashboard",
      search: {
        page: 1,
        sortBy: "created_at",
        order: "desc",
        role: "all",
        deactivated: "all",
      },
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex items-center gap-2 px-4 py-2">
          <UserCog className="size-8" />
          <h1 className="text-lg font-bold sm:text-3xl">User Menagement</h1>
        </div>

        <p className="text-zinc-400 max-sm:text-sm">
          Edit user information, manage roles, and more.
        </p>

        <div className="flex items-center gap-2 mt-6">
          <IconButton
            icon={UserPlus}
            text="Create User"
            onClick={handleCreateUserClick}
            variant="primary"
          />
          <IconButton
            icon={UserPen}
            text="Manage Users"
            onClick={
              !isAuthenticated ? handleLoginClick : handleNavigateToDashboard
            }
            variant="primary"
          />
        </div>

        {showCreateUserCard && (
          <CreateUserModal onClose={handleCloseUserModal} />
        )}
        {showLoginCard && !isAuthenticated && (
          <LoginModal onClose={handleCloseLoginCard} />
        )}
      </div>
    </>
  );
}
