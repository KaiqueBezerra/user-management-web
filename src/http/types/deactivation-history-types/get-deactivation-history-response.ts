export type GetUserDeactivationHistoryResponse = {
    id: string;
    user_id: string;
    deactivation_reasons: string[];
    deactivation_dates: Date[];
    reactivation_reasons: string[] | null;
    reactivation_dates: Date[] | null;
    deactivations_by_admin: string[];
    reactivations_by_admin: string[] | null;
}