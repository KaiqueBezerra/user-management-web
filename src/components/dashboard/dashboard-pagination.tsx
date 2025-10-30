import type { SetStateAction } from "react";
import { Button } from "../form/button";

import { useTranslation } from "react-i18next";

export function DashboardPagination({
  page,
  totalPages,
  setPage,
}: {
  page: number | undefined;
  totalPages: number | undefined;
  setPage: (value: SetStateAction<number>) => void;
}) {
  const { t } = useTranslation("dashboardPagination");

  return (
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-zinc-400">
        {t("page")} {page} {t("of")} {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          variant="primary"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          text={t("previous")}
          disabled={page === 1}
          className="py-1 text-sm"
        />
        <Button
          variant="primary"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages || p))}
          text={t("next")}
          disabled={page === totalPages}
          className="py-1 text-sm"
        />
      </div>
    </div>
  );
}
