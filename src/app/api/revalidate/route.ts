import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: any = {};
  try { body = await req.json(); } catch {}

  const slug = body?.slug || body?.slug?.current;
  const tag  = body?.tag;

  revalidateTag("site-settings"); // глобальні налаштування (лого тощо)
  revalidatePath("/");            // головна

  if (typeof slug === "string" && slug) {
    revalidatePath(slug.startsWith("/") ? slug : `/${slug}`);
  }
  if (typeof tag === "string" && tag) {
    revalidateTag(tag);
  }

  return NextResponse.json({ ok: true, at: Date.now(), slug, tag });
}
