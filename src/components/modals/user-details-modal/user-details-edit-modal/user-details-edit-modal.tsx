import { motion, AnimatePresence } from "framer-motion";
import type { User } from "../../../../context/auth/auth-context";
import { Button } from "../../../form/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../form/input";
import { useUpdateUser } from "../../../../http/users-functions/use-update-user";
import { toast } from "../../../../components/toast/toast";
import { useTranslation } from "react-i18next";

interface UserDetailsEditModalProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  user: User;
}

const editUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.email("Invalid email").min(1, "Email is required"),
  role: z.enum(["user", "admin"]),
});

type EditUserFormData = z.infer<typeof editUserSchema>;

export function UserDetailsEditModal({
  setIsEditing,
  onClose,
  user,
}: UserDetailsEditModalProps) {
  const { t } = useTranslation("userDetailsEdit");

  const { mutateAsync: updateUser } = useUpdateUser(user.id);

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role as "user" | "admin",
    },
  });

  async function handleUpdateUser(data: EditUserFormData) {
    try {
      await updateUser(data);
      toast.success(t("userUpdatedSuccessfully"));
      setIsEditing(false);
      onClose();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.form
        key="edit-modal"
        onSubmit={form.handleSubmit(handleUpdateUser)}
        className="space-y-4"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        <div>
          <Input
            label={t("name")}
            id="name"
            {...form.register("name")}
            error={form.formState.errors.name?.message}
          />
        </div>
        <div>
          <Input
            label={t("email")}
            id="email"
            {...form.register("email")}
            error={form.formState.errors.email?.message}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            {t("role")}
          </label>
          <select
            id="role"
            {...form.register("role")}
            className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-white"
          >
            <option value="user">{t("user")}</option>
            <option value="admin">{t("admin")}</option>
          </select>
          <span className="text-red-500 text-sm">
            {form.formState.errors.role?.message}
          </span>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            variant="secondary"
            text={t("cancel")}
            onClick={() => setIsEditing(false)}
          />
          <Button variant="primary" text={t("update")} type="submit" />
        </div>
      </motion.form>
    </AnimatePresence>
  );
}
