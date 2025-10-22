// app/(routes)/articles/[Id]/page.jsx
import { getBySlugClient } from "@/components/server/fetchnews";
import SimpleNewsPost from "@/components/fullpage";
import { notFound } from "next/navigation";

function safeDecode(str) {
  if (!str) return str;
  // try decodeURIComponent up to 3 times (handles accidental double-encoding)
  let prev = str;
  for (let i = 0; i < 3; i++) {
    try {
      const dec = decodeURIComponent(prev);
      if (dec === prev) break;
      prev = dec;
    } catch (e) {
      // if decode fails, stop and return current value
      break;
    }
  }
  return prev;
}

export default async function Page(props) {
  const params = await props.params;
  const raw = params?.Id; // could be string or array for catch-all

  // normalize to single string (join arrays with '/')
  const slugFromParams = Array.isArray(raw) ? raw.join("/") : raw ?? "";

  // decode any percent-encoding (handles Hindi / other non-ascii)
  const decodedSlug = safeDecode(slugFromParams);

  if (!decodedSlug) return notFound();

  try {
    // Try fetching with decoded slug first
    let post = await getBySlugClient(decodedSlug);

    return <SimpleNewsPost post={post} />;
  } catch (err) {
    console.error("Error fetching post for slug:", decodedSlug, err);
    return notFound();
  }
}
