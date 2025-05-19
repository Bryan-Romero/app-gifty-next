"use client";

import { useAlerts } from "@/hooks";
import { Alert } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";

export const Alerts = () => {
  const { alerts } = useAlerts();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              {...alert}
              className="w-full max-w-xs"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
