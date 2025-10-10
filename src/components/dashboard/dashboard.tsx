import { useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { useUsers } from "../../http/use-users";
import { toast } from "../toast/toast";
import { useAuth } from "../../context/auth/use-auth";
import { useEffect, useState } from "react";
import CreateUserCard from "../cards/create-user-card/create-user-card";
import { Spin } from "../spin/spin";
import { DashboardHeader } from "./dashboard-header";
import { DashboardUserList } from "./dashboard-user-list";

export function DashboardComponent() {
  const { user, logout } = useAuth();

  const router = useRouter();
  const navigate = useNavigate();

  // Reads parameters from the URL
  const search = useSearch({
    from: "/_auth/dashboard",
  }) as {
    page?: string;
    sortBy?: "created_at" | "updated_at";
    order?: "asc" | "desc";
  };

  // initializes with values from the URL (or defaults)
  const [page, setPage] = useState(Number(search?.page ?? 1));
  const [sortBy, setSortBy] = useState<"created_at" | "updated_at">(
    search?.sortBy ?? "created_at"
  );
  const [order, setOrder] = useState<"asc" | "desc">(search?.order ?? "desc");
  const limit = 10;

  const { data, isLoading } = useUsers(page, limit, sortBy, order);
  const users = data?.users ?? [];

  const [showCreateUserCard, setShowCreateUserCard] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const handleCreateUserClick = () => setShowCreateUserCard(true);
  const handleCloseUserCard = () => setShowCreateUserCard(false);

  function handleLogout() {
    logout();
    router.invalidate().finally(() => {
      navigate({ to: "/" });
    });
    toast.success("Logout successful!");
  }

  // Updates the URL whenever page, sortBy, or order change
  useEffect(() => {
    navigate({
      to: "/dashboard",
      search: { page, sortBy, order },
      replace: true, // replaces the current entry in the history stack
    });
  }, [page, sortBy, order, navigate]);

  useEffect(() => {
    if (user) setLoadingUser(false);
  }, [user]);

  if (loadingUser || isLoading) {
    return <Spin />;
  }

  return (
    <section className="grid gap-6 p-4">
      <DashboardHeader
        name={user?.name ?? ""}
        handleCreateUserClick={handleCreateUserClick}
        handleLogout={handleLogout}
      />

      <DashboardUserList
        users={users}
        page={page}
        totalPages={data?.totalPages}
        setPage={setPage}
        sortBy={sortBy}
        order={order}
        setSortBy={setSortBy}
        setOrder={setOrder}
      />

      {showCreateUserCard && <CreateUserCard onClose={handleCloseUserCard} />}
    </section>
  );
}
