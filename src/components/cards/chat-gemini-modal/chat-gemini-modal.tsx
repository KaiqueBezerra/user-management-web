import { useState } from "react";
import { X, Send } from "lucide-react";
import { useGetUserByEmailGemini } from "../../../http/use-get-user-by-email-gemini";

type Message = {
  from: "user" | "ai";
  text: string;
};

type ChatGeminiModalProps = {
  onClose: () => void;
};

export function ChatGeminiModal({ onClose }: ChatGeminiModalProps) {
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "ai",
      text: "Hello! 😊 Enter an email below to search for the user. ",
    },
  ]);

  const { mutateAsync, isPending } = useGetUserByEmailGemini();

  async function handleSend() {
    if (!email.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { from: "user", text: email }]);

    const currentEmail = email;
    setEmail("");

    try {
      const result = await mutateAsync({ email: currentEmail });

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl shadow-xl w-full max-w-md h-[500px] flex flex-col relative text-white">
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
          {isPending && (
            <div className="text-zinc-500 text-sm">AI is thinking...</div>
          )}
        </div>

        {/* Input field */}
        <div className="border-t border-zinc-800 p-3 flex items-center justify-center gap-2">
          <div className="flex-1">
            <input
              id="email"
              type="email"
              placeholder="Enter an email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              className="bg-zinc-900 w-full px-4 py-2 border rounded-md
              focus:outline-none focus:ring-2 border-zinc-700 focus:ring-zinc-400"
            />
          </div>

          <button
            className="flex items-center justify-center bg-zinc-900 hover:bg-zinc-800 
            text-white border-zinc-700 px-4 py-2 border rounded-md transition-colors cursor-pointer"
            onClick={handleSend}
            disabled={isPending}
            type="button"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}
