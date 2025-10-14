import { useState } from "react";
import { X, Send } from "lucide-react";
import { useGetUserByEmailGemini } from "../../../http/use-get-user-by-email-gemini";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Message = {
  from: "user" | "ai";
  text: string;
};

const chatGeminiSchema = z.object({
  email: z.email("Invalid email").min(1, "Email is required"),
});

type ChatGeminiFormData = z.infer<typeof chatGeminiSchema>;

export function ChatGeminiModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "ai",
      text: "Hello! 😊 Enter an email below to search for the user.",
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
          text: `${result.message}\n\n👤 Name: ${result.user.name}\n📧 Email: ${result.user.email}\n🧩 Role: ${result.user.role}`,
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
    <div className="fixed bottom-20 right-6 z-50 animate-[slideIn_0.25s_ease-out] transform transition-all">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-xl w-[360px] h-[460px] flex flex-col text-white relative">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chat with AI (Gemini)</h2>
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
              <div
                className={`max-w-[80%] px-3 py-2 rounded-lg whitespace-pre-line ${
                  msg.from === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-zinc-800 text-zinc-100 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isSubmitting && (
            <div className="text-zinc-500 text-sm">AI is thinking...</div>
          )}
        </div>

        {/* Input field */}
        <form
          onSubmit={form.handleSubmit(handleSend)}
          className="border-t border-zinc-800 p-3 gap-2"
        >
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                id="email"
                type="email"
                placeholder="Enter an email..."
                {...form.register("email")}
                disabled={isSubmitting}
                className="bg-zinc-900 w-full px-4 py-2 border rounded-md
                focus:outline-none focus:ring-2 border-zinc-700 focus:ring-zinc-400"
              />
            </div>

            <button
              className="flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 
              text-white border-zinc-700 px-4 py-2 border rounded-md transition-colors cursor-pointer"
              disabled={isSubmitting}
              type="submit"
            >
              <Send />
            </button>
          </div>
          {form.formState.errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </form>
      </div>

      {/* Pequena animação de entrada */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
