import { UserCog, UserPen, UserPlus } from "lucide-react";
import { useState } from "react";
import IconButton from "../form/icon-button";
import LoginCard from "../cards/login-card/login-card";
import CreateUserCard from "../cards/create-user-card/create-user-card";
import { useAuth } from "../../context/auth/use-auth";
import { useNavigate, useRouter } from "@tanstack/react-router";

export function IndexComponent() {
  const { isAuthenticated } = useAuth();

  const [showCreateUserCard, setShowCreateUserCard] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);

  const router = useRouter();
  const navigate = useNavigate();

  const handleCreateUserClick = () => {
    setShowCreateUserCard(true);
  };

  const handleCloseUserCard = () => {
    setShowCreateUserCard(false);
  };

  const handleLoginClick = () => {
    console.log("teste1");

    setShowLoginCard(true);
  };

  const handleCloseLoginCard = () => {
    setShowLoginCard(false);
  };

  const handleNavigateToDashboard = () => {
    console.log("teste2");

    router.invalidate().finally(() => {
      navigate({ to: "/dashboard" });
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

        {showCreateUserCard && <CreateUserCard onClose={handleCloseUserCard} />}
        {showLoginCard && !isAuthenticated && (
          <LoginCard onClose={handleCloseLoginCard} />
        )}
      </div>
    </>
  );
}
