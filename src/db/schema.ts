import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  integer,
  pgEnum,
  jsonb,
  serial,
  index,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/pg-core";

// ── ENUMS ──────────────────────────────────────────────────────────────────

export const userRole = pgEnum("user_role", ["user", "admin"]);
export const contentStatus = pgEnum("content_status", [
  "draft",
  "published",
  "archived",
  "flagged",
]);
export const reportStatus = pgEnum("report_status", [
  "pending",
  "reviewed",
  "resolved",
  "dismissed",
]);
export const animeStatus = pgEnum("anime_status", [
  "airing",
  "completed",
  "upcoming",
  "cancelled",
]);
export const animeSeason = pgEnum("anime_season", [
  "winter",
  "spring",
  "summer",
  "fall",
]);
export const mediaType = pgEnum("media_type", [
  "image",
  "video",
  "embed",
]);
export const galleryCategory = pgEnum("gallery_category", [
  "landscape",
  "city",
  "food",
  "festival",
  "tourism",
  "illustration",
  "other",
]);

// ── USERS ──────────────────────────────────────────────────────────────────

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    username: text("username").notNull(),
    displayName: text("display_name"),
    avatarUrl: text("avatar_url"),
    bannerUrl: text("banner_url"),
    bio: text("bio").default(""),
    role: userRole("role").default("user").notNull(),
    reputation: integer("reputation").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    uniqueIndex("users_email_idx").on(t.email),
    uniqueIndex("users_username_idx").on(t.username),
    index("users_role_idx").on(t.role),
  ]
);

// ── SESSIONS ───────────────────────────────────────────────────────────────

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    token: text("token").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    uniqueIndex("sessions_token_idx").on(t.token),
    index("sessions_user_idx").on(t.userId),
  ]
);

// ── CATEGORIES ─────────────────────────────────────────────────────────────

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  parentId: uuid("parent_id"),
  icon: text("icon"),
  color: text("color"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ── ARTICLES ───────────────────────────────────────────────────────────────

export const articles = pgTable(
  "articles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    excerpt: text("excerpt"),
    body: text("body").notNull(),
    coverImage: text("cover_image"),
    categoryId: uuid("category_id").references(() => categories.id, {
      onDelete: "set null",
    }),
    authorId: uuid("author_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    status: contentStatus("status").default("draft").notNull(),
    tags: jsonb("tags").$type<string[]>().default([]),
    viewCount: integer("view_count").default(0).notNull(),
    likeCount: integer("like_count").default(0).notNull(),
    isFeatured: boolean("is_featured").default(false).notNull(),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("articles_slug_idx").on(t.slug),
    index("articles_category_idx").on(t.categoryId),
    index("articles_author_idx").on(t.authorId),
    index("articles_status_idx").on(t.status),
    index("articles_published_idx").on(t.publishedAt),
    index("articles_featured_idx").on(t.isFeatured),
  ]
);

// ── ANIME ──────────────────────────────────────────────────────────────────

export const anime = pgTable(
  "anime",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    titleJapanese: text("title_japanese"),
    titleEnglish: text("title_english"),
    slug: text("slug").notNull().unique(),
    synopsis: text("synopsis"),
    type: text("type").default("TV"), // TV, Movie, OVA, ONA, Special
    status: animeStatus("status").default("completed").notNull(),
    season: animeSeason("season"),
    year: integer("year"),
    episodeCount: integer("episode_count").default(0),
    episodeDuration: text("episode_duration"),
    rating: text("rating"), // G, PG, PG-13, R, etc.
    studioId: uuid("studio_id"),
    coverImage: text("cover_image"),
    bannerImage: text("banner_image"),
    trailerUrl: text("trailer_url"),
    malId: integer("mal_id"),
    anilistId: integer("anilist_id"),
    score: integer("score").default(0), // scaled 0-100
    popularity: integer("popularity").default(0),
    rank: integer("rank"),
    genres: jsonb("genres").$type<string[]>().default([]),
    themes: jsonb("themes").$type<string[]>().default([]),
    sourceMaterial: text("source_material"),
    aired: text("aired"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("anime_slug_idx").on(t.slug),
    index("anime_status_idx").on(t.status),
    index("anime_year_idx").on(t.year),
    index("anime_score_idx").on(t.score),
    index("anime_popularity_idx").on(t.popularity),
    index("anime_season_year_idx").on(t.season, t.year),
  ]
);

// ── STUDIOS ────────────────────────────────────────────────────────────────

export const studios = pgTable("studios", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  logoUrl: text("logo_url"),
  website: text("website"),
  foundedYear: integer("founded_year"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ── CHARACTERS ─────────────────────────────────────────────────────────────

export const characters = pgTable(
  "characters",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    nameJapanese: text("name_japanese"),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    imageUrl: text("image_url"),
    animeId: uuid("anime_id").references(() => anime.id, {
      onDelete: "set null",
    }),
    role: text("role"), // Main, Supporting, etc.
    voiceActorJa: text("voice_actor_ja"),
    voiceActorEn: text("voice_actor_en"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [index("characters_anime_idx").on(t.animeId)]
);

// ── VOICE ACTORS (SEIYUU) ─────────────────────────────────────────────────

export const voiceActors = pgTable("voice_actors", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  nameJapanese: text("name_japanese"),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  birthDate: text("birth_date"),
  birthplace: text("birthplace"),
  agency: text("agency"),
  website: text("website"),
  roles: jsonb("roles").$type<string[]>().default([]),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ── OPENINGS / ENDINGS ─────────────────────────────────────────────────────

export const openingsEndings = pgTable(
  "openings_endings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    animeId: uuid("anime_id")
      .references(() => anime.id, { onDelete: "cascade" })
      .notNull(),
    title: text("title").notNull(),
    type: text("type").notNull(), // "opening" | "ending"
    number: integer("number").default(1),
    artist: text("artist"),
    songTitle: text("song_title"),
    youtubeUrl: text("youtube_url"),
    thumbnailUrl: text("thumbnail_url"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [index("oe_anime_idx").on(t.animeId)]
);

// ── ANIME EPISODES ─────────────────────────────────────────────────────────

export const animeEpisodes = pgTable(
  "anime_episodes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    animeId: uuid("anime_id")
      .references(() => anime.id, { onDelete: "cascade" })
      .notNull(),
    number: integer("number").notNull(),
    title: text("title"),
    titleJapanese: text("title_japanese"),
    synopsis: text("synopsis"),
    airDate: text("air_date"),
    duration: text("duration"),
    thumbnailUrl: text("thumbnail_url"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("episodes_anime_idx").on(t.animeId),
    uniqueIndex("episodes_anime_number_idx").on(t.animeId, t.number),
  ]
);

// ── NEWS ───────────────────────────────────────────────────────────────────

export const news = pgTable(
  "news",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    excerpt: text("excerpt"),
    body: text("body").notNull(),
    coverImage: text("cover_image"),
    source: text("source"),
    sourceUrl: text("source_url"),
    categoryId: uuid("category_id").references(() => categories.id, {
      onDelete: "set null",
    }),
    authorId: uuid("author_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    status: contentStatus("status").default("published").notNull(),
    tags: jsonb("tags").$type<string[]>().default([]),
    viewCount: integer("view_count").default(0).notNull(),
    isBreaking: boolean("is_breaking").default(false).notNull(),
    aiSummary: text("ai_summary"),
    publishedAt: timestamp("published_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("news_slug_idx").on(t.slug),
    index("news_category_idx").on(t.categoryId),
    index("news_published_idx").on(t.publishedAt),
    index("news_breaking_idx").on(t.isBreaking),
  ]
);

// ── FORUM SECTIONS ─────────────────────────────────────────────────────────

export const forumSections = pgTable("forum_sections", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
  sortOrder: integer("sort_order").default(0).notNull(),
  threadCount: integer("thread_count").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ── FORUM THREADS ──────────────────────────────────────────────────────────

export const forumThreads = pgTable(
  "forum_threads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    body: text("body").notNull(),
    sectionId: uuid("section_id")
      .references(() => forumSections.id, { onDelete: "cascade" })
      .notNull(),
    authorId: uuid("author_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    isPinned: boolean("is_pinned").default(false).notNull(),
    isLocked: boolean("is_locked").default(false).notNull(),
    viewCount: integer("view_count").default(0).notNull(),
    replyCount: integer("reply_count").default(0).notNull(),
    tags: jsonb("tags").$type<string[]>().default([]),
    status: contentStatus("status").default("published").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("threads_section_idx").on(t.sectionId),
    index("threads_author_idx").on(t.authorId),
    index("threads_slug_idx").on(t.slug),
  ]
);

// ── FORUM REPLIES ──────────────────────────────────────────────────────────

export const forumReplies = pgTable(
  "forum_replies",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    body: text("body").notNull(),
    threadId: uuid("thread_id")
      .references(() => forumThreads.id, { onDelete: "cascade" })
      .notNull(),
    authorId: uuid("author_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    parentId: uuid("parent_id"), // for threaded replies
    status: contentStatus("status").default("published").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("replies_thread_idx").on(t.threadId),
    index("replies_author_idx").on(t.authorId),
    index("replies_parent_idx").on(t.parentId),
  ]
);

// ── GALLERY ────────────────────────────────────────────────────────────────

export const galleryItems = pgTable(
  "gallery_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description"),
    imageUrl: text("image_url").notNull(),
    thumbnailUrl: text("thumbnail_url"),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    category: galleryCategory("category").default("other").notNull(),
    mediaType: mediaType("media_type").default("image").notNull(),
    tags: jsonb("tags").$type<string[]>().default([]),
    isAiGenerated: boolean("is_ai_generated").default(false).notNull(),
    status: contentStatus("status").default("published").notNull(),
    viewCount: integer("view_count").default(0).notNull(),
    likeCount: integer("like_count").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("gallery_user_idx").on(t.userId),
    index("gallery_category_idx").on(t.category),
    index("gallery_status_idx").on(t.status),
  ]
);

// ── COMMENTS ───────────────────────────────────────────────────────────────

export const comments = pgTable(
  "comments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    body: text("body").notNull(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    parentId: uuid("parent_id"),
    // Polymorphic target: can reference articles, anime, news, gallery, or threads
    targetType: text("target_type").notNull(), // "article" | "anime" | "news" | "gallery" | "thread"
    targetId: uuid("target_id").notNull(),
    status: contentStatus("status").default("published").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("comments_target_idx").on(t.targetType, t.targetId),
    index("comments_user_idx").on(t.userId),
    index("comments_parent_idx").on(t.parentId),
  ]
);

// ── FAVORITES ──────────────────────────────────────────────────────────────

export const favorites = pgTable(
  "favorites",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    targetType: text("target_type").notNull(), // "anime" | "article" | "gallery" | "thread"
    targetId: uuid("target_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    uniqueIndex("favorites_unique_idx").on(t.userId, t.targetType, t.targetId),
    index("favorites_user_idx").on(t.userId),
  ]
);

// ── REVIEWS ────────────────────────────────────────────────────────────────

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    body: text("body").notNull(),
    rating: integer("rating").notNull(), // 1-10
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    animeId: uuid("anime_id")
      .references(() => anime.id, { onDelete: "cascade" })
      .notNull(),
    status: contentStatus("status").default("published").notNull(),
    likeCount: integer("like_count").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    uniqueIndex("reviews_user_anime_idx").on(t.userId, t.animeId),
    index("reviews_anime_idx").on(t.animeId),
  ]
);

// ── REPORTS ────────────────────────────────────────────────────────────────

export const reports = pgTable(
  "reports",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reporterId: uuid("reporter_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    targetType: text("target_type").notNull(), // "article" | "comment" | "gallery" | "thread" | "review"
    targetId: uuid("target_id").notNull(),
    reason: text("reason").notNull(),
    description: text("description"),
    status: reportStatus("status").default("pending").notNull(),
    reviewerId: uuid("reviewer_id").references(() => users.id),
    resolution: text("resolution"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("reports_status_idx").on(t.status),
    index("reports_target_idx").on(t.targetType, t.targetId),
  ]
);

// ── SITE CONFIG ────────────────────────────────────────────────────────────

export const siteConfig = pgTable("site_config", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ── TAGS ───────────────────────────────────────────────────────────────────

export const tags = pgTable("tags", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  usageCount: integer("usage_count").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ── EXPORTS ────────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type Anime = typeof anime.$inferSelect;
export type Studio = typeof studios.$inferSelect;
export type Character = typeof characters.$inferSelect;
export type VoiceActor = typeof voiceActors.$inferSelect;
export type OpeningEnding = typeof openingsEndings.$inferSelect;
export type AnimeEpisode = typeof animeEpisodes.$inferSelect;
export type NewsItem = typeof news.$inferSelect;
export type ForumSection = typeof forumSections.$inferSelect;
export type ForumThread = typeof forumThreads.$inferSelect;
export type ForumReply = typeof forumReplies.$inferSelect;
export type GalleryItem = typeof galleryItems.$inferSelect;
export type Comment = typeof comments.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Report = typeof reports.$inferSelect;
export type SiteConfigRow = typeof siteConfig.$inferSelect;
export type Tag = typeof tags.$inferSelect;
