import { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/", "/mapa", "/mapa/", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
