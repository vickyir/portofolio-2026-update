import type { MetadataRoute } from "next";

// TODO: replace with the real production domain once one is chosen.
const BASE_URL = "https://example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
