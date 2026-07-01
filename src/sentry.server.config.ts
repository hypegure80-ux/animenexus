// Este archivo configura el SDK de Sentry para el entorno de Node.js (servidor).
// Se utiliza para capturar errores y monitorear el rendimiento en el lado del servidor.

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Ajusta esta opción para controlar la proporción de transacciones que se envían a Sentry.
  // Al establecerlo en 1.0, se enviará el 100% de las transacciones.
  tracesSampleRate: 1.0,
  // Habilita el modo de depuración para ver logs detallados de Sentry en la consola.
  // Desactívalo en producción.
  debug: process.env.NODE_ENV !== "production", // Se activa en desarrollo
});