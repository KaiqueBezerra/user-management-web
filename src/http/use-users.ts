import { useQuery } from "@tanstack/react-query";
import type { GetUsersResponse } from "./types/get-users-response";

export function useUsers(page: number, limit: number) {
    return useQuery({
        queryKey: ["get-users", page, limit],
        queryFn: async () => {
            const response = await fetch(
                `http://localhost:3333/api/users?page=${page}&limit=${limit}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const result: GetUsersResponse = await response.json();
            return result
        },
    });
}
