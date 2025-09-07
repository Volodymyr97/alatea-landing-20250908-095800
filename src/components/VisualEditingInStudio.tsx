'use client';

import { useEffect, useState } from "react";
import { VisualEditing } from "next-sanity";

export function VisualEditingInStudio() {
  const [inStudio, setInStudio] = useState(false);
  useEffect(() => {
    setInStudio(window !== window.parent || !!window.opener);
  }, []);
  if (!inStudio) return null;
  return <VisualEditing />;
}
