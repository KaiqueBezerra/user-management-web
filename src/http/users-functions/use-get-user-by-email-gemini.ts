import { useMutation } from "@tanstack/react-query";
import type { GetUserByEmailGeminiRequest } from "../types/users-types/get-user-by-email-gemini-request";
import type { GetUserByEmailGeminiResponse } from "../types/users-types/get-user-by-email-gemini-response";

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
                throw new Error(result.message || "Error fetching user with Gemini");
            }

            return result as GetUserByEmailGeminiResponse;
        },

        onError: (error) => {
            console.error("Error fetching user with Gemini:", error);
        }
    });
}
