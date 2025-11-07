export function formatDate(date?: string | Date) {
  const d = date ? new Date(date) : new Date();
  return d.toLocaleDateString();
}
