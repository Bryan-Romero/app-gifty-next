'use client'

import { Alert, ScrollShadow } from '@heroui/react'
import { AnimatePresence, motion } from 'framer-motion'

import { useAlerts } from '@/hooks'

export const Alerts = () => {
  const { alerts, removeAlert } = useAlerts()

  if (alerts.length < 1) return null

  return (
    <ScrollShadow
      hideScrollBar
      className="pointer-events-none fixed right-4 bottom-4 z-50 flex h-full max-h-80 w-full max-w-xs flex-col-reverse items-end gap-2"
      visibility="top"
    >
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            layout
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            initial={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3 }}
          >
            <Alert {...alert} className="pointer-events-auto w-full" onClose={() => removeAlert(alert.id)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </ScrollShadow>
  )
}
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
