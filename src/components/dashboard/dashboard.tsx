import { useNavigate, useSearch } from "@tanstack/react-router";
import { useUsers } from "../../http/users-functions/use-users";
import { toast } from "../toast/toast";
import { useAuth } from "../../context/auth/use-auth";
import { useEffect, useState } from "react";
import { Spin } from "../spin/spin";
import { DashboardHeader } from "./dashboard-header";
import { DashboardUserList } from "./dashboard-user-list";
import { MessageCircle } from "lucide-react";
import { CreateUserModal } from "../modals/create-user-modal/create-user-modal";
import { ChatGeminiModal } from "../modals/chat-gemini-modal/chat-gemini-modal";
import { IconButton } from "../form/icon-button";

import { useTranslation } from "react-i18next";

export function DashboardComponent() {
  const { t } = useTranslation("dashboard");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const search = useSearch({
    from: "/_auth/dashboard",
  }) as {
    page?: string;
    sortBy?: "created_at" | "updated_at";
    order?: "asc" | "desc";
    role?: "admin" | "user" | "all";
    deactivated?: "true" | "false" | "all";
  };

  const [page, setPage] = useState(Number(search?.page ?? 1));
  const [sortBy, setSortBy] = useState<"created_at" | "updated_at">(
    search?.sortBy ?? "created_at"
  );
  const [order, setOrder] = useState<"asc" | "desc">(search?.order ?? "desc");
  const [role, setRole] = useState<"admin" | "user" | "all">(
    search?.role ?? "all"
  );
  const [deactivated, setDeactivated] = useState<"true" | "false" | "all">(
    search?.deactivated ?? "all"
  );
  const limit = 10;

  const { data, isLoading } = useUsers(
    page,
    limit,
    sortBy,
    order,
    role,
    deactivated
  );
  const users = data?.users ?? [];

  const [showCreateUserCard, setShowCreateUserCard] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [showGeminiModal, setShowGeminiModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  function handleLogout() {
    logout();
    navigate({ to: "/" });
    toast.success(t("logoutSuccess"));
  }

  useEffect(() => {
    navigate({
      to: "/dashboard",
      search: { page, sortBy, order, role, deactivated },
      replace: true,
    });
  }, [page, sortBy, order, role, deactivated, navigate]);

  useEffect(() => {
    if (user) setLoadingUser(false);
  }, [user]);

  if (loadingUser || isLoading) {
    return <Spin />;
  }

  // Filter out the current user from the list
  const filteredUsers = users.filter((u) => u.id !== user?.id);

  const toggleGeminiModal = () => {
    if (showGeminiModal) {
      setAnimateModal(false);
      setTimeout(() => setShowGeminiModal(false), 200);
    } else {
      setShowGeminiModal(true);
      setTimeout(() => setAnimateModal(true), 10);
    }
  };

  return (
    <section className="grid gap-6 p-4">
      <DashboardHeader
        name={user?.name ?? ""}
        handleCreateUserClick={() => setShowCreateUserCard(true)}
        handleLogout={handleLogout}
      />

      <DashboardUserList
        users={filteredUsers}
        page={page}
        totalPages={data?.totalPages}
        setPage={setPage}
        sortBy={sortBy}
        order={order}
        setSortBy={setSortBy}
        setOrder={setOrder}
        role={role}
        setRole={setRole}
        deactivated={deactivated}
        setDeactivated={setDeactivated}
      />

      {showCreateUserCard && (
        <CreateUserModal onClose={() => setShowCreateUserCard(false)} />
      )}

      <IconButton
        icon={MessageCircle}
        onClick={toggleGeminiModal}
        className="fixed bottom-6 right-6 bg-zinc-900 hover:bg-zinc-800 text-white 
        flex justify-center items-center rounded-full p-4 shadow-lg cursor-pointer
        hover:scale-105 transition-transform border border-zinc-700"
      />

      {showGeminiModal && (
        <div
          className={`fixed bottom-1 right-1 z-50 transition-all duration-200 ease-in-out transform ${
            animateModal
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <ChatGeminiModal onClose={toggleGeminiModal} />
        </div>
      )}
    </section>
  );
}
