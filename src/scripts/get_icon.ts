export function getBlogPageIcon(pageTitle: string) {
  return (
    {
      Kanada: "🇨🇦",
    }[pageTitle] ?? "🎉"
  );
}
