import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../form/input";
import { Button } from "../../../form/button";
import { useTranslation } from "react-i18next";

const reasonSchema = z.object({
  reason: z.string().min(3, "Reason must be at least 3 characters"),
});

type ReasonFormData = z.infer<typeof reasonSchema>;

type UserDetailsStatusReasonModalProps = {
  action: "deactivate" | "reactivate";
  onConfirm: (data: ReasonFormData) => void;
  onClose: () => void;
  innerRef: React.RefObject<HTMLDivElement | null>;
};

export function UserDetailsStatusReasonModal({
  action,
  onConfirm,
  onClose,
  innerRef,
}: UserDetailsStatusReasonModalProps) {
  const { t } = useTranslation("userDetailsStatus");

  const form = useForm<ReasonFormData>({
    resolver: zodResolver(reasonSchema),
    defaultValues: { reason: "" },
  });

  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;

  const handleFormSubmit = (data: ReasonFormData) => {
    onConfirm(data);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <motion.div
          ref={innerRef}
          className="bg-zinc-950 p-6 rounded-lg w-full max-w-md border border-zinc-700 shadow-lg"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <h2 className="text-xl font-semibold mb-4">
            {action === "deactivate"
              ? t("deactivateUser")
              : t("reactivateUser")}
          </h2>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <Input
              id="reason"
              label={t("reason")}
              {...register("reason")}
              error={errors.reason?.message}
              placeholder={t("enterReason")}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                text={t("cancel")}
              />
              <Button
                type="submit"
                variant={action === "deactivate" ? "warning" : "primary"}
                text={
                  action === "deactivate" ? t("deactivate") : t("reactivate")
                }
                disabled={isSubmitting}
              />
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
