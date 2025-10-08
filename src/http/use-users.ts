import { useQuery } from "@tanstack/react-query";
import type { GetUsersResponse } from "./types/get-users-response";

export function useUsers() {
    return useQuery({
        queryKey: ["get-users"],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3333/api/users`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const result: GetUsersResponse = await response.json();

            return result;
        },
    });
}