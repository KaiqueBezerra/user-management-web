import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUserDeactivationHistory } from "../../../http/deactivation-history-functions/use-get-deactivation-history";
import { useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";

export function UserDeactivationHistoryModal({
  user,
  onClose,
}: {
  user: { id: string; name: string };
  onClose: () => void;
}) {
  const { t } = useTranslation("userDeactivationHistory");

  const { data, isLoading, isError } = useGetUserDeactivationHistory(user.id);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-zinc-900 rounded-lg shadow-xl border border-zinc-700 w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          ref={modalRef}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-white cursor-pointer absolute top-3 right-3  hover:text-zinc-600"
          >
            <X size={20} />
          </button>

          <h2 className="text-lg font-semibold mb-6">
            {t("title", { name: user.name })}
          </h2>

          {isLoading && <p className="text-zinc-400">Loading history...</p>}
          {isError && <p className="text-red-400">Failed to load history.</p>}

          {!data && <p className="text-zinc-400">{t("noHistoryFound")}</p>}

          {data && Array.isArray(data.deactivation_dates) && (
            <>
              {data.deactivation_dates.length === 0 ? (
                <p className="text-zinc-400">
                  {t("noDeactivationHistoryFound")}
                </p>
              ) : (
                <div className="relative border-l border-zinc-700 pl-6 space-y-6">
                  {data.deactivation_dates.map((date, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative"
                    >
                      <span className="absolute -left-3 top-2 w-4 h-4 rounded-full bg-red-500 border-2 border-zinc-900 shadow-md" />

                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-zinc-400 mb-1">
                          {new Date(date).toLocaleDateString("pt-BR")}
                        </p>
                        <p className="font-semibold text-red-400 mb-1">
                          {t("deactivated")}
                        </p>
                        <p className="text-sm text-zinc-300">
                          <strong>{t("reason")}:</strong>{" "}
                          {data.deactivation_reasons[index] || "—"}
                        </p>
                        <p className="text-sm text-zinc-300">
                          <strong>{t("by")}:</strong>{" "}
                          {data.deactivations_by_admin[index] ||
                            "Administrator"}
                        </p>
                      </div>

                      {/* Reactivation corresponding to this deactivation */}
                      {data.reactivation_dates?.[index] && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 + 0.1 }}
                          className="relative mt-4 ml-6"
                        >
                          <span className="absolute -left-[22px] top-2 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-zinc-900 shadow-md" />
                          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-zinc-400 mb-1">
                              {new Date(
                                data.reactivation_dates[index]
                              ).toLocaleDateString("pt-BR")}
                            </p>
                            <p className="font-semibold text-green-400 mb-1">
                              {t("reactivated")}
                            </p>
                            <p className="text-sm text-zinc-300">
                              <strong>{t("reason")}:</strong>{" "}
                              {data.reactivation_reasons?.[index] || "—"}
                            </p>
                            <p className="text-sm text-zinc-300">
                              <strong>{t("by")}:</strong>{" "}
                              {data.reactivations_by_admin?.[index] ||
                                "Administrator"}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
