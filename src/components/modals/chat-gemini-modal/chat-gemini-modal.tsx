import { useState } from "react";
import { X, Send } from "lucide-react";
import { useGetUserByEmailGemini } from "../../../http/users-functions/use-get-user-by-email-gemini";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconButton } from "../../form/icon-button";
import { Input } from "../../form/input";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

type Message = {
  from: "user" | "ai";
  text: string;
};

const chatGeminiSchema = z.object({
  email: z.email("Invalid email").min(1, "Email is required"),
});

type ChatGeminiFormData = z.infer<typeof chatGeminiSchema>;

export function ChatGeminiModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation("chatGemini");

  const [messages, setMessages] = useState<Message[]>([
    {
      from: "ai",
      text: t("welcome"),
    },
  ]);

  const { mutateAsync: getUserByEmail } = useGetUserByEmailGemini();

  const form = useForm<ChatGeminiFormData>({
    resolver: zodResolver(chatGeminiSchema),
    defaultValues: { email: "" },
  });

  async function handleSend(data: ChatGeminiFormData) {
    if (!data.email.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: data.email }]);

    try {
      const result = await getUserByEmail(data);
      form.setValue("email", "");
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: t("userInfo", {
            name: result.user.name,
            email: result.user.email,
            role: result.user.role === "admin" ? t("admin") : t("user"),
            deactivated: result.user.deactivated
              ? t("deactivated")
              : t("active"),
          }),
        },
      ]);
    } catch (error: unknown) {
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: "❌ " + ((error as Error).message || "Failed to fetch user."),
        },
      ]);
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed bottom-20 right-6 z-50"
      >
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-xl w-[360px] h-[460px] flex flex-col text-white relative">
          {/* Header */}
          <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
            <h2 className="text-lg font-semibold">{t("title")}</h2>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`max-w-[80%] px-3 py-2 rounded-lg whitespace-pre-line ${
                    msg.from === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-zinc-800 text-zinc-100 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </motion.div>
              </div>
            ))}
            {isSubmitting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-zinc-500 text-sm"
              >
                {t("thinking")}
              </motion.div>
            )}
          </div>

          {/* Input field */}
          <form
            onSubmit={form.handleSubmit(handleSend)}
            className="border-t border-zinc-800 p-3 gap-2"
          >
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  id="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  {...form.register("email")}
                  disabled={isSubmitting}
                />
              </div>

              <IconButton
                icon={Send}
                onClick={form.handleSubmit(handleSend)}
                disabled={isSubmitting}
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
