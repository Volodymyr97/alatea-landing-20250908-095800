import type { Metadata } from "next";
import { ubuntu } from "@/app/fonts";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";

export const metadata: Metadata = {
  title: "Rocket + Sanity",
  description: "Next.js + Sanity starter with Visual Editing",
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();
  return (
    <>
      {children}
      {isEnabled && (
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-xl bg-black/80 text-white px-4 py-2">
          <VisualEditing />
          <DisableDraftMode />
        </div>
      )}
    </>
  );
}
