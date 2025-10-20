import { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "../../form/input";
import { Button } from "../../form/button";
import z from "zod";
import { useLogin } from "../../../http/auth-functions/use-login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../../toast/toast";
import { useNavigate, useRouter } from "@tanstack/react-router";

interface LoginModalProps {
  onClose: () => void;
}

const loginSchema = z.object({
  email: z.email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(500, "Password must be less than 500 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginModal({ onClose }: LoginModalProps) {
  const { mutateAsync: login } = useLogin();
  const modalRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(data: LoginFormData) {
    try {
      await login(data);
      toast.success("Login successful!");
      onClose();
      router.invalidate().finally(() => {
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
      });
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-zinc-950 rounded-lg p-6 w-full border border-zinc-700 max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute text-white cursor-pointer top-4 right-4 hover:text-zinc-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Login as admin</h2>

        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
          <Input
            label="Email"
            id="email"
            {...form.register("email")}
            error={form.formState.errors.email?.message}
          />

          <Input
            label="Password"
            id="password"
            type="password"
            {...form.register("password")}
            error={form.formState.errors.password?.message}
          />

          <div className="flex">
            <Button
              text="Login"
              type="submit"
              variant="primary"
              fullWidth
              className="mt-4"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
