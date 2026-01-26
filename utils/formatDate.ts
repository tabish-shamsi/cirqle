import { format, formatDistanceToNow, differenceInDays } from "date-fns";

export function formatDate(date: string | Date) {
  const d = new Date(date);
  const daysDiff = differenceInDays(new Date(), d);

  if (daysDiff < 30) {
    return formatDistanceToNow(d, { addSuffix: true }); // e.g., "3 hours ago"
  } else {
    return format(d, "dd MMM yyyy"); // e.g., "12 Oct 2024"
  }
}

export function toDateString(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}