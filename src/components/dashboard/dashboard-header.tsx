import { Button } from "../form/button";

export function DashboardHeader({
  name,
  handleCreateUserClick,
  handleLogout,
}: {
  name: string;
  handleCreateUserClick: () => void;
  handleLogout: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-zinc-400">Welcome, {name}!</p>
      </div>

      <div className="flex gap-4 items-center">
        <Button
          variant="primary"
          onClick={handleCreateUserClick}
          text="Create"
        />
        <Button variant="danger" onClick={handleLogout} text="Logout" />
      </div>
    </div>
  );
}
