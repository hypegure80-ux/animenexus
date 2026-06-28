import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ErrorMessage, EmptyState } from "@/components/ui/error-message";
import { Heart, Tv, Image } from "lucide-react";
import { getSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "My Favorites" };

export default async function FavoritesPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login?from=/favorites");
  }

  const userId = session.user.id;

  const { data: favorites, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("userId", userId);

  if (error) {
    if (error.code === "42P01") {
      return (
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="flex items-center gap-3 mb-8">
            <Heart className="h-8 w-8 text-pink-400 fill-pink-400" />
            <h1 className="text-3xl font-bold text-white">My Favorites</h1>
          </div>
          <EmptyState message="Los favoritos aún no están disponibles. La funcionalidad está en construcción." />
        </div>
      );
    }
    return <ErrorMessage message="Error al cargar favoritos." />;
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-pink-400 fill-pink-400" />
          <h1 className="text-3xl font-bold text-white">My Favorites</h1>
        </div>
        <EmptyState message="No tienes favoritos aún. ¡Empieza a explorar y guarda lo que te gusta!" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="h-8 w-8 text-pink-400 fill-pink-400" />
        <h1 className="text-3xl font-bold text-white">My Favorites</h1>
      </div>

      <p className="text-gray-400 mb-8">Tienes {favorites.length} favoritos</p>

      <div className="space-y-2">
        {favorites.map((fav) => (
          <Card key={fav.id} className="bg-gray-900/60 hover:bg-gray-900/80 transition-all">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-800">
                {fav.targetType === "anime" && <Tv className="h-4 w-4 text-pink-400" />}
                {fav.targetType === "gallery" && <Image className="h-4 w-4 text-purple-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white text-sm">Target ID: {fav.targetId}</h3>
                <p className="text-xs text-gray-400 capitalize">{fav.targetType}</p>
              </div>
              <Heart className="h-4 w-4 text-pink-400 fill-pink-400" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
