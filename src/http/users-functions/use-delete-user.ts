import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DeleteUserResponse } from "../types/users-types/delete-user-response";

export function useDeleteUser(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const response = await fetch(`http://localhost:3333/api/users/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Error deleting user");
            }

            return result as DeleteUserResponse;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-users"] });
        },

        onError: (error) => {
            console.error("Error deleting user:", error);
        }
    });
}
