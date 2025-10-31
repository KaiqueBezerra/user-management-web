import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "../../form/input";
import { Button } from "../../form/button";
import z from "zod";
import { useCreateUser } from "../../../http/users-functions/use-create-user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../../toast/toast";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../../context/auth/use-auth";

import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface UserModalProps {
  onClose: () => void;
}

const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(500, "Password must be less than 500 characters"),
  role: z.enum(["user", "admin"]),
});

type CreateUserFormData = z.infer<typeof createUserSchema>;

export function CreateUserModal({ onClose }: UserModalProps) {
  const { t } = useTranslation("createUser");

  const { mutateAsync: createUser } = useCreateUser();

  const modalRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
  });

  async function handleCreateUser(data: CreateUserFormData) {
    try {
      await createUser(data);
      toast.success(t("createUserSuccess"));
      onClose();
      if (isAuthenticated) {
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
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }

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

  const { isSubmitting } = form.formState;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="modal-background"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          key="modal-content"
          ref={modalRef}
          className="bg-zinc-950 rounded-lg p-6 w-full border border-zinc-700 max-w-md relative"
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 40 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <button
            onClick={onClose}
            className="absolute text-white cursor-pointer top-4 right-4 hover:text-zinc-600"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-bold mb-6">{t("createUserTitle")}</h2>

          <form
            onSubmit={form.handleSubmit(handleCreateUser)}
            className="space-y-4"
          >
            <Input
              label={t("nameLabel")}
              id="name"
              {...form.register("name")}
              error={form.formState.errors.name?.message}
            />

            <Input
              label={t("emailLabel")}
              id="email"
              {...form.register("email")}
              error={form.formState.errors.email?.message}
            />

            <Input
              label={t("passwordLabel")}
              id="password"
              {...form.register("password")}
              error={form.formState.errors.password?.message}
              type="password"
            />

            <div className="mb-6">
              <label htmlFor="role" className="block text-sm font-medium mb-1">
                {t("roleLabel")}
              </label>
              <select
                id="role"
                {...form.register("role")}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-zinc-400"
              >
                <option value="user">{t("userRole")}</option>
                <option value="admin">{t("adminRole")}</option>
              </select>
              <span className="text-red-500 text-sm">
                {form.formState.errors.role?.message}
              </span>
            </div>

            <div className="flex justify-end">
              <Button
                text={t("cancelButton")}
                onClick={onClose}
                variant="secondary"
                className="mr-2"
                type="button"
                disabled={isSubmitting}
              />
              <Button
                text={t("createUserButton")}
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              />
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
