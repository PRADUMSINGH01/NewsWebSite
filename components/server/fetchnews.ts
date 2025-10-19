// lib/firestoreHelpers.ts
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
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
  const snap = await getDocs(colRef);
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
