// Tipos para la API de Jikan
export interface JikanAnime {
  mal_id: number;
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  synopsis: string | null;
  type: "TV" | "Movie" | "OVA" | "ONA" | "Special" | null;
  status: "airing" | "complete" | "upcoming" | null;
  episodes: number | null;
  duration: string | null;
  rating: string | null;
  score: number | null;
  rank: number | null;
  popularity: number | null;
  season: "winter" | "spring" | "summer" | "fall" | null;
  year: number | null;
  studios: { mal_id: number; name: string }[];
  genres: { mal_id: number; name: string }[];
  themes: { mal_id: number; name: string }[];
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
  } | null;
  theme: {
    openings: string[];
    endings: string[];
  };
  aired: {
    from: string | null;
    to: string | null;
    prop: {
      from: { day: number; month: number; year: number };
      to: { day: number; month: number; year: number };
    };
    string: string | null;
  };
  source: string | null;
  broadcast: {
    day_of_the_week: number;
    string: string | null;
    time: string | null;
    timezone: string | null;
  } | null;
  relations: {
    relation: string;
    entry: { mal_id: number; name: string; type: string }[];
  }[];
}

export interface JikanResponse<T> {
  data: T;
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number | null;
  };
}

export interface JikanTopAnime {
  mal_id: number;
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  type: "TV" | "Movie" | "OVA" | "ONA" | "Special" | null;
  episodes: number | null;
  score: number | null;
  status: "airing" | "complete" | "upcoming" | null;
  year: number | null;
  themes: { mal_id: number; name: string }[];
}

export interface JikanNews {
  mal_id: number;
  title: string;
  url: string;
  image_url: string | null;
  excerpt: string | null;
  date: string;
  author_username: string | null;
  author_url: string | null;
  forum_url: string | null;
}

export type Season = "winter" | "spring" | "summer" | "fall";

const BASE_URL = "https://api.jikan.moe/v4";

/**
 * Obtiene los anime más populares
 * @param page - Número de página (default: 1)
 */
export async function getTopAnime(page: number = 1): Promise<JikanTopAnime[] | null> {
  try {
    const res = await fetch(`${BASE_URL}/top/anime?page=${page}&limit=20`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data: JikanResponse<JikanTopAnime[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching top anime:", error);
    return null;
  }
}

/**
 * Obtiene un anime por su ID de MyAnimeList
 * @param id - ID del anime en MyAnimeList
 */
export async function getAnimeById(id: string | number): Promise<JikanResponse<JikanAnime> | null> {
  try {
    const res = await fetch(`${BASE_URL}/anime/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data: JikanResponse<JikanAnime> = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching anime by id:", error);
    return null;
  }
}

/**
 * Obtiene los anime de una temporada específica
 * @param year - Año de la temporada
 * @param season - Temporada (winter, spring, summer, fall)
 */
export async function getSeasonalAnime(
  year: number,
  season: Season
): Promise<JikanTopAnime[] | null> {
  try {
    const res = await fetch(`${BASE_URL}/seasons/${year}/${season}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data: JikanResponse<JikanTopAnime[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching seasonal anime:", error);
    return null;
  }
}

/**
 * Busca anime por nombre
 * @param query - Texto de búsqueda
 */
export async function searchAnime(query: string): Promise<JikanTopAnime[] | null> {
  try {
    const res = await fetch(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=20`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data: JikanResponse<JikanTopAnime[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error searching anime:", error);
    return null;
  }
}

/**
 * Obtiene las noticias de un anime específico
 * @param id - ID del anime en MyAnimeList
 */
export async function getAnimeNews(id: string | number): Promise<JikanNews[] | null> {
  try {
    const res = await fetch(`${BASE_URL}/anime/${id}/news`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data: JikanResponse<JikanNews[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching anime news:", error);
    return null;
  }
}

/**
 * Obtiene la temporada actual
 */
export function getCurrentSeason(): { year: number; season: Season } {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  let season: Season;
  if (month >= 0 && month <= 2) {
    season = "winter";
  } else if (month >= 3 && month <= 5) {
    season = "spring";
  } else if (month >= 6 && month <= 8) {
    season = "summer";
  } else {
    season = "fall";
  }

  return { year, season };
}