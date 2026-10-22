import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { env } from "@/env";

export default function robots(): MetadataRoute.Robots {
  if (!env.ALLOW_INDEXING) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
