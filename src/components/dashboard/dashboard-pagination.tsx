import type { SetStateAction } from "react";
import { Button } from "../form/button";

export function DashboardPagination({
  page,
  totalPages,
  setPage,
}: {
  page: number | undefined;
  totalPages: number | undefined;
  setPage: (value: SetStateAction<number>) => void;
}) {
  return (
    <div className="flex justify-between items-center mt-4">
      <p className="text-sm text-zinc-400">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          variant="primary"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          text="Previous"
          disabled={page === 1}
          className="py-1 text-sm"
        />
        <Button
          variant="primary"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages || p))}
          text="Next"
          disabled={page === totalPages}
          className="py-1 text-sm"
        />
      </div>
    </div>
  );
}
