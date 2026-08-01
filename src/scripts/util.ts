export function getBlogPageIcon(albumURL: string) {
  return (
    {
      "2025-03-07-03-10-texel": "🇳🇱",
      "2025-09-10-10-08-kanada": "🇨🇦",
    }[albumURL] ?? "🎉"
  );
}

export function toURL(albumName: string) {
  return albumName.slice(1).replaceAll(/[\/–—|]/g, "-").replaceAll(" ", "").toLowerCase();
}