import { Button } from "../form/button";

import { useTranslation } from "react-i18next";

export function DashboardHeader({
  name,
  handleCreateUserClick,
  handleLogout,
}: {
  name: string;
  handleCreateUserClick: () => void;
  handleLogout: () => void;
}) {
  const { t } = useTranslation("dashboardHeader");

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-zinc-400">
          {t("welcome")}, {name}!
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <Button
          variant="primary"
          onClick={handleCreateUserClick}
          text={t("createUser")}
        />
        <Button variant="danger" onClick={handleLogout} text={t("logout")} />
      </div>
    </div>
  );
}
