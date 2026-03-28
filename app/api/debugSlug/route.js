import { NextResponse } from 'next/server';
import { fetchCollection } from '@/components/server/fetchnews';

export async function GET(request) {
  try {
    const allNews = await fetchCollection('news');
    const firstNews = allNews && allNews.length > 0 ? allNews[0] : null;
    return NextResponse.json({ success: true, count: allNews?.length, firstNews });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
