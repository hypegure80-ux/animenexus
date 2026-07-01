"use client";

import { Button } from "@/components/ui/button"; // Importar el componente Button
import { useRouter } from "next/navigation"; // Importar useRouter
 
export function ErrorMessage({ message = "Ocurrió un error. Intenta más tarde.", onRetry }: { message?: string; onRetry?: () => void }) {
  const router = useRouter();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      router.refresh(); // Por defecto, refrescar la página para reintentar la carga de datos del servidor
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="rounded-lg bg-red-900/20 border border-red-500/30 p-4 text-center">
        <p className="text-red-400">{message}</p>
        <div className="mt-4">
          <Button onClick={handleRetry}>Reintentar</Button>
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ message = "No hay contenido disponible por el momento." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="rounded-lg bg-gray-800/50 border border-gray-700 p-4 text-center">
        <p className="text-gray-400">{message}</p>
      </div>
    </div>
  );
}