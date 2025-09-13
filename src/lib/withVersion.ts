export function withVersion(url?: string | null, v?: string | null) {
  if (!url) return url as any;
  const sep = url.includes("?") ? "&" : "?";
  return v ? `${url}${sep}v=${v}` : `${url}${sep}_=${Date.now()}`;
}
