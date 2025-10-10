import { useMutation } from "@tanstack/react-query";
import type { LoginRequest } from "./types/login-request";
import type { LoginResponse } from "./types/login-response";
import { useAuth } from "../context/auth/use-auth";

export function useLogin() {
    const { login } = useAuth();

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
                throw new Error(result.message || "Unknown error logging in.");
            }

            return result;
        },

        onSuccess: (data) => {
            login(data.token);
        },

        onError: (error) => {
            console.error("Error logging in:", error);
        }
    });
}