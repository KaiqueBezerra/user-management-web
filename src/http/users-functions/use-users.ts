import { useQuery } from "@tanstack/react-query";
import type { GetUsersResponse } from "../types/users-types/get-users-response";

export function useUsers(
    page: number,
    limit: number,
    sortBy: string,
    order: string,
    role: string = "all",
    deactivated: "true" | "false" | "all" = "all"
) {
    return useQuery({
        queryKey: ["get-users", page, limit, sortBy, order, role, deactivated],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: String(page),
                limit: String(limit),
                sortBy,
                order,
            });

            if (role && role !== "all") params.append("role", role);
            if (deactivated && deactivated !== "all")
                params.append("deactivated", deactivated);

            const response = await fetch(
                `http://localhost:3333/api/users?${params.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Error fetching users");
            }

            return result as GetUsersResponse
        },
    });
}
