import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCollections, getProducts } from "@/lib/repositories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const staticRoutes = [
    "",
    "/shop",
    "/gift-builder",
    "/track",
    "/wishlist",
    "/about",
    "/contact",
    "/faq",
    "/delivery-returns",
    "/care-guides",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const collectionRoutes = getCollections().map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = getProducts().map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
