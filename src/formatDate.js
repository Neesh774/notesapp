export default function formatDate(dateString) {
  // use intl to format date relative time
  const date = new Date(dateString);
  const intl = new Intl.RelativeTimeFormat("en", {
    style: "long",
  });
  const now = new Date();
  const diff = now - date;
  const diffInMinutes = Math.round(diff / 1000 / 60);
  const diffInHours = Math.round(diffInMinutes / 60);
  const diffInDays = Math.round(diffInHours / 24);

  if (diffInMinutes < 1) {
    return "Just now";
  }
  if (diffInHours < 1) {
    return intl.format(-diffInMinutes, "minute");
  }
  if (diffInDays < 1) {
    return intl.format(-diffInHours, "hour");
  }
  return intl.format(-diffInDays, "day");
}
