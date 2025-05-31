"use client";

import { useAlerts } from "@/hooks";
import { Alert, ScrollShadow } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";

export const Alerts = () => {
  const { alerts, removeAlert } = useAlerts();

  if (alerts.length < 1) return null;

  return (
    <ScrollShadow
      hideScrollBar
      visibility="top"
      className="w-full max-w-xs h-full max-h-80 fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2 items-end pointer-events-none"
    >
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            layout
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              {...alert}
              className="w-full pointer-events-auto"
              onClose={() => removeAlert(alert.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </ScrollShadow>
  );
};
/**
 * initial: Estado inicial cuando el componente aparece.
 *    opacity: 0 → Comienza invisible.
 *    y: 24 → Comienza 24 píxeles más abajo.
 *
 * animate: Estado final al entrar (cuando se muestra).
 *    opacity: 1 → Se vuelve visible.
 *    y: 0 → Se mueve a su posición original.
 *
 * exit: Estado al salir (cuando se elimina del DOM).
 *    opacity: 0 → Se desvanece.
 *    y: 24 → Se mueve hacia abajo 24 píxeles.
 *
 * transition: Duración de la animación:
 *    duration: 0.3 → La animación dura 0.3 segundos.
 *    Cada transición (initial → animate y animate → exit) dura 0.3 segundos por separado.
 *
 * layout: En cada <motion.div>. Esto activa la animación automática de reordenamiento.
 * */
