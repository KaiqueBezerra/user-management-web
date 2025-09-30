import { UserCog, UserPen, UserPlus } from "lucide-react";
import { useState } from "react";
import IconButton from "./components/form/icon-button";
import CreateUserCard from "./components/create-user-card/create-user-card";

function App() {
  const [showCreateUserCard, setShowCreateUserCard] = useState(false);

  const handleCreateUserClick = () => {
    setShowCreateUserCard(true);
  };

  const handleCloseUserCard = () => {
    setShowCreateUserCard(false);
  };

  return (
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
        <IconButton icon={UserPen} text="Manage Users" variant="primary" />
      </div>

      {showCreateUserCard && <CreateUserCard onClose={handleCloseUserCard} />}
    </div>
  );
}

export default App;
