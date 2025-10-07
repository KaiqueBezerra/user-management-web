import { UserCog, UserPen, UserPlus } from "lucide-react";
import { useState } from "react";
import IconButton from "../form/icon-button";
import LoginCard from "../cards/login-card/login-card";
import CreateUserCard from "../cards/create-user-card/create-user-card";

export function IndexComponent() {
  const [showCreateUserCard, setShowCreateUserCard] = useState(false);
  const [showLoginCard, setShowLoginCard] = useState(false);

  const handleCreateUserClick = () => {
    setShowCreateUserCard(true);
  };

  const handleCloseUserCard = () => {
    setShowCreateUserCard(false);
  };

  const handleLoginClick = () => {
    setShowLoginCard(true);
  };

  const handleCloseLoginCard = () => {
    setShowLoginCard(false);
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
            onClick={handleLoginClick}
            variant="primary"
          />
        </div>

        {showCreateUserCard && <CreateUserCard onClose={handleCloseUserCard} />}
        {showLoginCard && <LoginCard onClose={handleCloseLoginCard} />}
      </div>
    </>
  );
}
