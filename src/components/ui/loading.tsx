export function Loading({ text = "Cargando..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
        <p className="text-sm text-gray-400">{text}</p>
      </div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="animate-pulse">
      <div className="rounded-lg bg-gray-800 h-36" />
      <div className="mt-4 h-4 w-3/4 rounded bg-gray-800" />
      <div className="mt-2 h-3 w-1/2 rounded bg-gray-800" />
    </div>
  );
}