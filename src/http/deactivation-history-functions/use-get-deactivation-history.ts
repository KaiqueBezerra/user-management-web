import { useQuery } from "@tanstack/react-query";
import type { GetUserDeactivationHistoryResponse } from "../types/deactivation-history-types/get-deactivation-history-response";

export function useGetUserDeactivationHistory(userId: string) {
    return useQuery({
        queryKey: ["get-user-deactivation-history", userId],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3333/api/users/${userId}/deactivation-history`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status === 404) {
                return null; // No deactivation history found for this user.
            }

            if (!response.ok) {
                throw new Error("Failed to fetch deactivation history.");
            }

            const result: GetUserDeactivationHistoryResponse = await response.json();

            return result;
        },
    });
}