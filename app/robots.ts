import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://www.hmarduniya.in";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/_next/", "/api/", "/login", "/register", "/admin"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
