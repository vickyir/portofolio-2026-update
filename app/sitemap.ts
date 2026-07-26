import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

// TODO: replace with the real production domain once one is chosen.
const BASE_URL = "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = projects.map((project) => ({
    url: `${BASE_URL}/work/${project.slug}`,
    lastModified: new Date(),
  }));

  return [{ url: BASE_URL, lastModified: new Date() }, ...projectEntries];
}
