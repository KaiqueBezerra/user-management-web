export type GetUserByEmailGeminiResponse = {
    message: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        created_at: string;
        updated_at?: string | null;
        deactivated: boolean
    };
};