export type GetUsersResponse = {
    users: {
        id: string;
        name: string;
        email: string;
        role: string;
        created_at: string;
        updated_at: string | null;
    }[];
    total: number;
    page: number;
    totalPages: number;
};
