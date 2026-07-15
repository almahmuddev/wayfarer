import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import { Experience } from "@/models/Experience";
import { blogPosts } from "@/lib/data/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Regenerate hourly rather than freezing at build time, so new
// experiences (added post-deploy via /items/add) get included.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/experiences",
    "/about",
    "/contact",
    "/blog",
    "/help",
    "/privacy",
    "/terms",
    "/login",
    "/register",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  let experienceRoutes: MetadataRoute.Sitemap = [];
  try {
    await connectDB();
    const experiences = await Experience.find({ isPublished: true })
      .select("slug updatedAt")
      .lean();
    experienceRoutes = experiences.map((exp) => ({
      url: `${SITE_URL}/experiences/${exp.slug}`,
      lastModified: new Date(exp.updatedAt),
    }));
  } catch {
    // DB unreachable at build/request time - static + blog routes still work
  }

  return [...staticRoutes, ...blogRoutes, ...experienceRoutes];
}
