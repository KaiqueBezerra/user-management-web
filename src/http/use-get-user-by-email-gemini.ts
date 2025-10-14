import { useMutation } from "@tanstack/react-query";
import type { GetUserByEmailGeminiRequest } from "./types/get-user-by-email-gemini-request";
import type { GetUserByEmailGeminiResponse } from "./types/get-user-by-email-gemini-response";

export function useGetUserByEmailGemini() {
    return useMutation({
        mutationFn: async (data: GetUserByEmailGeminiRequest) => {
            const response = await fetch("http://localhost:3333/api/users/gemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Erro ao buscar usuário com Gemini");
            }

            return result as GetUserByEmailGeminiResponse;
        },
    });
}
