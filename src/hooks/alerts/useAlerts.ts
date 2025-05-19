import { useAppContext } from "@/app/providers";
import { AlertProps } from "@heroui/react";
import { useRef } from "react";

export function useAlerts() {
  const { alerts, setAlerts } = useAppContext();
  const alertId = useRef(0);

  // Agrega una alerta y la elimina después de 3 segundos
  const pushAlert = (alert: Omit<AlertProps, "id">) => {
    const id = alertId.current++;
    setAlerts((prev) => [...prev, { ...alert, id: id.toString() }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id.toString()));
    }, 3000);
  };

  return {
    alerts,
    pushAlert,
  };
}
