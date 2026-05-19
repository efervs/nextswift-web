/**
 * reading-time — estimador simple sin dependencia externa.
 * 200 palabras por minuto (lectura adulta ES-MX en pantalla).
 */
export function readingTime(markdown: string): { minutes: number; label: string } {
  const words = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`~\-\[\]\(\)!|]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return { minutes, label: `${minutes} min lectura` };
}
