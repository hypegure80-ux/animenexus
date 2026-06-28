"use client";

export function ErrorMessage({ message = "Ocurrió un error. Intenta más tarde." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="rounded-lg bg-red-900/20 border border-red-500/30 p-4 text-center">
        <p className="text-red-400">{message}</p>
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