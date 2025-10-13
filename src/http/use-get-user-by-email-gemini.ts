import { useMutation } from "@tanstack/react-query";

type GetUserByEmailGeminiRequest = {
    email: string;
};

type GetUserByEmailGeminiResponse = {
    message: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        created_at: string;
        updated_at?: string | null;
    };
};

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
