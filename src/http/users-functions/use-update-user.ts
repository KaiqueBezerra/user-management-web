import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateUserRequest } from "../types/users-types/update-user-request";
import type { UpdateUserResponse } from "../types/users-types/update-user-response";

export function useUpdateUser(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateUserRequest) => {
            const response = await fetch(`http://localhost:3333/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(data),
            });

            const result: UpdateUserResponse = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unknown error updating user.");
            }

            return result;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-users"] });
        },

        onError: (error) => {
            console.error("Error updating user:", error);
        }
    });
}