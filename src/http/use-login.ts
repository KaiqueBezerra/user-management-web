import { useMutation } from "@tanstack/react-query";
import type { LoginRequest } from "./types/login-request";
import type { LoginResponse } from "./types/login-response";

export function useLogin() {
    // const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: LoginRequest) => {
            const response = await fetch("http://localhost:3333/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result: LoginResponse = await response.json();

            if (!response.ok) {
                // Lança um erro personalizado contendo a mensagem do backend
                throw new Error(result.message || "Unknown error logging in.");
            }

            return result;
        },

        onSuccess: (data) => {
            if (data && data.token) {
                // Armazene o token no localStorage (ou sessionStorage)
                localStorage.setItem("authToken", data.token);
                // Aqui você pode configurar algo para disparar quando o login for bem-sucedido (como redirecionamento)
                console.log("Successfully stored token:", data.token);
            }
        },

        onError: (error) => {
            console.error("Error logging in:", error);
        }
    });
}