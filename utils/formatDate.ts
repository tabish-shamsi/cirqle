import { format, formatDistanceToNow, differenceInDays } from "date-fns";

export function formatDate(date: string | Date) {
  const d = new Date(date);
  const daysDiff = differenceInDays(new Date(), d);

  if (daysDiff < 30) {
    // Less than 30 days ago → show "X hours ago"
    return formatDistanceToNow(d, { addSuffix: true }); // e.g., "3 hours ago"
  } else {
    // Older → show absolute date
    return format(d, "dd MMM yyyy"); // e.g., "12 Oct 2024"
  }
}
