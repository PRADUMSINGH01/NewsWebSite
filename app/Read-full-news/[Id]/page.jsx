// app/(routes)/articles/[Id]/page.jsx   <-- folder name determines params key
import ArticlePage from "@/components/fullpage";
import { getBySlugClient } from "@/components/server/fetchnews";
export default async function Page(props) {
  // props.params is an async accessor in Next 15+ — await it
  const params = await props.params;
  // handle catch-all arrays
  const raw = params?.Id; // use exactly the param name (Id vs slug vs id)
  const slug = Array.isArray(raw) ? raw.join("/") : raw;
  const res = await getBySlugClient(slug);

  // server-side debug (dev only)

  return <ArticlePage slug={slug} collection="news" />;
}
