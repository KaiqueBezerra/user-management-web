import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReactivateUserRequest } from "../types/deactivations-types/reactivate-user-request";
import type { ReactivateUserResponse } from "../types/deactivations-types/reactivate-user-response";

export function useReactivateUser(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: ReactivateUserRequest) => {
            const response = await fetch(`http://localhost:3333/api/users/${userId}/reactivate`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(data),
            });

            const result: ReactivateUserResponse = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unknown error reactivating user.");
            }

            return result;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-users"] });
        },

        onError: (error) => {
            console.error("Error reactivating user:", error);
        }
    });
}