export type GetUsersResponse = {
    users: {
        id: string;
        name: string;
        email: string;
        role: string;
        created_at: string;
        updated_at: string | null;
        deactivated: boolean;
    }[];
    total: number;
    page: number;
    totalPages: number;
};
