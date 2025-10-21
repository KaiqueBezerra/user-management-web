export type UpdateUserRequest = {
    name: string;
    email: string;
    role: "user" | "admin";
};