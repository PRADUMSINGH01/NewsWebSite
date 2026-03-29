// app/Test/page.tsx

import { Metadata } from "next";

const TEST_SLUG = "middle-east-tension-iran-us-war-inflation-effect-india-2026";
const TEST_FIREBASE_IMG = "https://firebasestorage.googleapis.com/v0/b/nomeet-b84a6/o/news-assets%2F2026-03-28%2F1774715997370-gmf3j8-Screenshot__31_.png?alt=media&token=5ec1a7e3-7186-4dd2-b768-71f1ca640283";

// Dynamically determine the base URL so it works smoothly in both local development and production
const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.hmarduniya.in";
const proxyImageUrl = `${baseUrl}/api/og?title=` + encodeURIComponent("Test OG Metadata | Hmar Duniya") + "&url=" + encodeURIComponent(TEST_FIREBASE_IMG);



const FB_DEBUG = "https://developers.facebook.com/tools/debug/?q=" + encodeURIComponent("https://www.hmarduniya.in/Test");
const OG_XYZ = "https://www.opengraph.xyz/url/" + encodeURIComponent("https://www.hmarduniya.in/Test");
const TW_VAL = "https://cards-dev.twitter.com/validator";

export const metadata: Metadata = {
    metadataBase: new URL("https://www.hmarduniya.in"),
    title: "Test OG Metadata | Hmar Duniya",
    description: "Testing Open Graph metadata with Firebase image proxy.",
    openGraph: {
        title: "Test OG Metadata | Hmar Duniya",
        description: "Testing Open Graph metadata with Firebase image proxy.",
        url: "https://www.hmarduniya.in/Test",
        siteName: "Hmar Duniya",
        images: [{ url: proxyImageUrl, width: 1200, height: 630, alt: "Test OG Image" }],
        locale: "hi_IN",
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Test OG Metadata | Hmar Duniya",
        description: "Testing Open Graph metadata with Firebase image proxy.",
        images: [proxyImageUrl],
    },
};

export default function TestPage() {
    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>

            <h1>OG Metadata Test Page</h1>

            <section style={{ marginTop: "1.5rem" }}>
                <h2>Proxy Image Preview</h2>
                <img src={proxyImageUrl} alt="OG Test" width={600} style={{ borderRadius: "8px", border: "1px solid #ccc" }} />
            </section>
            <section style={{ marginTop: "2rem" }}>
                <h2>Test These Tools</h2>
                <ul style={{ lineHeight: "2.5rem" }}>
                    <li><a href={FB_DEBUG} target="_blank" rel="noreferrer">Facebook OG Debugger</a></li>
                    <li><a href={TW_VAL} target="_blank" rel="noreferrer">Twitter Card Validator</a></li>
                    <li><a href={OG_XYZ} target="_blank" rel="noreferrer">OpenGraph.xyz Preview</a></li>
                </ul>
            </section>

            <section style={{ marginTop: "2rem" }}>
                <h2>Debug Info</h2>
                <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "0.85rem" }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: "8px", fontWeight: "bold", border: "1px solid #ddd" }}>Slug</td>
                            <td style={{ padding: "8px", border: "1px solid #ddd", wordBreak: "break-all" }}>{TEST_SLUG}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: "8px", fontWeight: "bold", border: "1px solid #ddd" }}>Raw Firebase URL</td>
                            <td style={{ padding: "8px", border: "1px solid #ddd", wordBreak: "break-all" }}>{TEST_FIREBASE_IMG}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: "8px", fontWeight: "bold", border: "1px solid #ddd" }}>Proxied Image URL</td>
                            <td style={{ padding: "8px", border: "1px solid #ddd", wordBreak: "break-all" }}>{proxyImageUrl}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: "8px", fontWeight: "bold", border: "1px solid #ddd" }}>Page URL</td>
                            <td style={{ padding: "8px", border: "1px solid #ddd", wordBreak: "break-all" }}>https://www.hmarduniya.in/Test</td>
                        </tr>
                    </tbody>
                </table>
            </section>

        </div>
    );
}