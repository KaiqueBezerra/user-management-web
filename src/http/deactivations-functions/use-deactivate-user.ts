import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DeactivateUserRequest } from "../types/deactivations-types/deactivate-user-request";
import type { DeactivateUserResponse } from "../types/deactivations-types/deactivate-user-response";

export function useDeactivateUser(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: DeactivateUserRequest) => {
            const response = await fetch(`http://localhost:3333/api/users/${userId}/deactivate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(data),
            });

            const result: DeactivateUserResponse = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unknown error deactivating user.");
            }

            return result;
        },

        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["get-users"] });;
            console.log("Successfully deactivated user:", data);
        },

        onError: (error) => {
            console.error("Error deactivating user:", error);
        }
    });
}