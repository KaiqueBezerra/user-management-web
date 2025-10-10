import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateUserRequest } from "./types/create-user-request";
import type { CreateUserResponse } from "./types/create-user-response";

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateUserRequest) => {
            const response = await fetch("http://localhost:3333/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result: CreateUserResponse = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unknown error creating user.");
            }

            return result;
        },

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["get-users"] });;
            console.log("Successfully created user:", data);
        },

        onError: (error) => {
            console.error("Error creating user:", error);
        }
    });
}