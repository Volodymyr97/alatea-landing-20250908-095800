'use client';

import { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";

export function DisableDraftMode() {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  // Не показуємо в Studio-роутах або коли сайт вбудований у фрейм/попап
  const inStudioRoute = pathname?.startsWith("/studio");
  const embedded = typeof window !== "undefined" && (window !== window.parent || !!window.opener);
  if (inStudioRoute || embedded) return null;

  const disable = () =>
    startTransition(async () => {
      await fetch("/api/draft-mode/disable");
      router.refresh();
    });

  return (
    <button
      type="button"
      onClick={disable}
      className="fixed bottom-4 left-4 z-50 text-sm px-3 py-1 rounded-md bg-black/80 text-white hover:bg-black/70 transition"
      disabled={pending}
    >
      {pending ? "Disabling…" : "Disable draft mode"}
    </button>
  );
}
