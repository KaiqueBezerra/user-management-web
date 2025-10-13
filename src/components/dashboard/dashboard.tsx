import { useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { useUsers } from "../../http/use-users";
import { toast } from "../toast/toast";
import { useAuth } from "../../context/auth/use-auth";
import { useEffect, useState } from "react";
import CreateUserCard from "../cards/create-user-card/create-user-card";
import { Spin } from "../spin/spin";
import { DashboardHeader } from "./dashboard-header";
import { DashboardUserList } from "./dashboard-user-list";
import { ChatGeminiModal } from "../cards/chat-gemini-modal/chat-gemini-modal";
import { MessageCircle } from "lucide-react";

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
    role?: "admin" | "user" | "all";
  };

  // initializes with values from the URL (or defaults)
  const [page, setPage] = useState(Number(search?.page ?? 1));
  const [sortBy, setSortBy] = useState<"created_at" | "updated_at">(
    search?.sortBy ?? "created_at"
  );
  const [order, setOrder] = useState<"asc" | "desc">(search?.order ?? "desc");
  const [role, setRole] = useState<"admin" | "user" | "all">(
    search?.role ?? "all"
  );
  const limit = 10;

  const { data, isLoading } = useUsers(page, limit, sortBy, order, role);
  const users = data?.users ?? [];

  const [showCreateUserCard, setShowCreateUserCard] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const [showGeminiModal, setShowGeminiModal] = useState(false);

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
      search: { page, sortBy, order, role },
      replace: true, // replaces the current entry in the history stack
    });
  }, [page, sortBy, order, navigate, role]);

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
        role={role}
        setRole={setRole}
      />

      {showCreateUserCard && <CreateUserCard onClose={handleCloseUserCard} />}

      {/* Floating button to open the Gemini chat modal */}
      <div className="fixed bottom-6 right-6">
        <button
          className="bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-700 flex justify-center 
          items-center !rounded-full !p-4 shadow-lg hover:scale-105 px-4 py-2 border transition-colors cursor-pointer"
          onClick={() => setShowGeminiModal(true)}
        >
          <MessageCircle className="size-4" />
        </button>
      </div>

      {showGeminiModal && (
        <ChatGeminiModal onClose={() => setShowGeminiModal(false)} />
      )}
    </section>
  );
}
