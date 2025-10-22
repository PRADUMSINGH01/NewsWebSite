// lib/firestoreHelpers.ts
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  CollectionReference,
  DocumentReference,
  WhereFilterOp,
} from "firebase/firestore";
import { db } from "./firebase";

/** Utility type for objects returned from Firestore (includes id) */
export type WithId<T> = T & { id: string };

/** Map QuerySnapshot to typed array with id */
const mapDocs = <T = DocumentData>(snap: QuerySnapshot<T>): Array<WithId<T>> =>
  snap.docs.map((d: QueryDocumentSnapshot<T>) => ({
    id: d.id,
    ...(d.data() as T),
  }));

/** Fetch all documents in a collection (use carefully for large collections) */
export async function fetchCollection<T = DocumentData>(
  collectionPath: string
): Promise<Array<WithId<T>>> {
  const colRef = collection(db, collectionPath) as CollectionReference<T>;
  const q = query(colRef, orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return mapDocs<T>(snap);
}

/** Fetch single document by id */
export async function fetchDocById<T = DocumentData>(
  collectionPath: string,
  id: string
): Promise<WithId<T> | null> {
  const docRef = doc(db, collectionPath, id) as DocumentReference<T>;
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as T) };
}

/** Flexible query options */
export type QueryOptions = {
  whereField?: string;
  whereOp?: WhereFilterOp;
  whereValue?: unknown;
  orderByField?: string;
  orderByDirection?: "asc" | "desc";
  limitNum?: number;
};

/** Cursor-based pagination: get first page ordered by a field */
export async function getFirstPage<T = DocumentData>(
  collectionPath: string,
  orderByField = "createdAt",
  pageSize = 10
): Promise<{
  items: Array<WithId<T>>;
  lastDoc: QueryDocumentSnapshot<T> | null;
}> {
  const q = query(
    collection(db, collectionPath) as CollectionReference<T>,
    orderBy(orderByField),
    limit(pageSize)
  );
  const snap = await getDocs(q);
  const items = mapDocs<T>(snap);
  const lastDoc = snap.docs[snap.docs.length - 1] ?? null;
  return { items, lastDoc };
}

/** Get next page using lastDoc from previous page (cursor) */
export async function getNextPage<T = DocumentData>(
  collectionPath: string,
  lastDoc: QueryDocumentSnapshot<T> | null,
  orderByField = "createdAt",
  pageSize = 10
): Promise<{
  items: Array<WithId<T>>;
  lastDoc: QueryDocumentSnapshot<T> | null;
}> {
  if (!lastDoc) return { items: [], lastDoc: null };

  const q = query(
    collection(db, collectionPath) as CollectionReference<T>,
    orderBy(orderByField),
    startAfter(lastDoc),
    limit(pageSize)
  );
  const snap = await getDocs(q);
  const items = mapDocs<T>(snap);
  const newLast = snap.docs[snap.docs.length - 1] ?? null;
  return { items, lastDoc: newLast };
}

/** Realtime listener for entire collection (returns unsubscribe function) */
export function listenToCollection<T = DocumentData>(
  collectionPath: string,
  cb: (items: Array<WithId<T>>) => void
) {
  const q = query(collection(db, collectionPath) as CollectionReference<T>);
  const unsub = onSnapshot(q, (snap) => {
    cb(mapDocs<T>(snap));
  });
  return unsub;
}

// Fixed and more resilient version of getBySlugClient.
// Tries several slug forms (raw, decoded, space-fixed, lowercased) and falls back to doc id lookup.
// Note: Firestore equality queries are case-sensitive — for true case-insensitive search store a normalized slug field (e.g. `slug_lower`) and query that.
export async function getBySlugClient(slug: string) {
  if (!slug) throw new Error("slug required");

  try {
    // build candidate slug variants to try (deduplicated)
    const raw = slug;
    let decoded = raw;
    try {
      decoded = decodeURIComponent(raw);
    } catch {
      // ignore decode errors — keep decoded as raw
      decoded = raw;
    }
    const plusFixed = raw.replace(/\+/g, " ");
    const candidates = Array.from(
      new Set([
        raw,
        decoded,
        plusFixed,
        raw.toLowerCase(),
        decoded.toLowerCase(),
      ])
    ).filter(Boolean);
    // try querying by slug field for each candidate
    for (const candidate of candidates) {
      const q = query(
        collection(db, "news"),
        where("slug", "==", candidate),
        limit(1)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        const d = snap.docs[0];
        return { id: d.id, data: d.data() };
      }
    }

    // fallback: try document id lookups (original and decoded)
    const docRef = doc(db, "news", raw);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return { id: docSnap.id, data: docSnap.data() };

    if (decoded !== raw) {
      const docRef2 = doc(db, "news", decoded);
      const docSnap2 = await getDoc(docRef2);
      if (docSnap2.exists()) return { id: docSnap2.id, data: docSnap2.data() };
    }

    return null;
  } catch (err) {
    // Keep error visible for debugging — rethrow so caller can handle it.
    console.error("getBySlugClient error:", err);
    throw err;
  }
}
