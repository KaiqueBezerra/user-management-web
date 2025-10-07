import { useQuery } from "@tanstack/react-query";
import type { GetUserResponse } from "./types/get-user-response";

export function useUser(userId: string) {
    return useQuery({
        queryKey: ["get-user", userId],
        queryFn: async () => {
            const response = await fetch(`http://localhost:3333/api/users/${userId}`);
            const result: GetUserResponse = await response.json();

            return result;
        },
    });
}