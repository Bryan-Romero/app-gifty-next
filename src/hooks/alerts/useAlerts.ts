import { useAppContext } from "@/app/providers";
import { AlertProps } from "@heroui/react";
import { useRef } from "react";

export function useAlerts() {
  const { alerts, setAlerts } = useAppContext();
  const alertId = useRef(0);

  // Agrega una alerta y la elimina después de 3 segundos
  const pushAlert = (alert: Omit<AlertProps, "id">, s: number = 3) => {
    const id = alertId.current++;
    setAlerts((prev) => [...prev, { ...alert, id: id.toString() }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id.toString()));
    }, s * 1000);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return {
    alerts,
    pushAlert,
    removeAlert,
  };
}
