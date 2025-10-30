import enIndex from "../locales/en/index/index.json";
import ptIndex from "../locales/pt/index/index.json";
import enLogin from "../locales/en/modals/login/login.json";
import ptLogin from "../locales/pt/modals/login/login.json";
import ptCreateUser from "../locales/pt/modals/create-user/create-user.json";
import enCreateUser from "../locales/en/modals/create-user/create-user.json";
import ptDashboardHeader from "../locales/pt/dashboard/dashboard-header.json";
import enDashboardHeader from "../locales/en/dashboard/dashboard-header.json";
import ptDashboardUserList from "../locales/pt/dashboard/dashboard-user-list.json";
import enDashboardUserList from "../locales/en/dashboard/dashboard-user-list.json";
import ptDashboardUserListItem from "../locales/pt/dashboard/dashboard-user-list-item.json";
import enDashboardUserListItem from "../locales/en/dashboard/dashboard-user-list-item.json";
import ptDashboardPagination from "../locales/pt/dashboard/dashboard-pagination.json";
import enDashboardPagination from "../locales/en/dashboard/dashboard-pagination.json";
import ptDashboardFilters from "../locales/pt/dashboard/dashboard-filters.json";
import enDashboardFilters from "../locales/en/dashboard/dashboard-filters.json";
import ptDashboard from "../locales/pt/dashboard/dashboard.json";
import enDashboard from "../locales/en/dashboard/dashboard.json";
import ptChatGemini from "../locales/pt/modals/chat-gemini/chat-gemini.json";
import enChatGemini from "../locales/en/modals/chat-gemini/chat-gemini.json";
import ptUserDetails from "../locales/pt/modals/user-details-modal/user-details.json";
import enUserDetails from "../locales/en/modals/user-details-modal/user-details.json";
import ptUserDetailsStatus from "../locales/pt/modals/user-details-modal/user-details-status/user-details-status.json";
import enUserDetailsStatus from "../locales/en/modals/user-details-modal/user-details-status/user-details-status.json";
import ptUserDetailsEdit from "../locales/pt/modals/user-details-modal/user-details-edit/user-details-edit.json";
import enUserDetailsEdit from "../locales/en/modals/user-details-modal/user-details-edit/user-details-edit.json";
import ptUserDeactivationHistory from "../locales/pt/modals/user-deactivation-history/user-deactivation-history.json";
import enUserDeactivationHistory from "../locales/en/modals/user-deactivation-history/user-deactivation-history.json";

export const i18nConfig = {
    fallbackLng: "en",
    debug: false,
    interpolation: { escapeValue: false },
    resources: {
        en: {
            index: enIndex,
            dashboard: enDashboard,
            dashboardHeader: enDashboardHeader,
            dashboardUserList: enDashboardUserList,
            dashboardUserListItem: enDashboardUserListItem,
            dashboardPagination: enDashboardPagination,
            dashboardFilters: enDashboardFilters,
            login: enLogin,
            createUser: enCreateUser,
            chatGemini: enChatGemini,
            userDetails: enUserDetails,
            userDetailsStatus: enUserDetailsStatus,
            userDetailsEdit: enUserDetailsEdit,
            userDeactivationHistory: enUserDeactivationHistory,
        },
        pt: {
            index: ptIndex,
            dashboard: ptDashboard,
            dashboardHeader: ptDashboardHeader,
            dashboardUserList: ptDashboardUserList,
            dashboardUserListItem: ptDashboardUserListItem,
            dashboardPagination: ptDashboardPagination,
            dashboardFilters: ptDashboardFilters,
            login: ptLogin,
            createUser: ptCreateUser,
            chatGemini: ptChatGemini,
            userDetails: ptUserDetails,
            userDetailsStatus: ptUserDetailsStatus,
            userDetailsEdit: ptUserDetailsEdit,
            userDeactivationHistory: ptUserDeactivationHistory,
        },
    },
};
