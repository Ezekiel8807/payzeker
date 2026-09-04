export function calculateEndDate(startDate: Date, duration: string) {
  const endDate = new Date(startDate);

  if (duration.includes("day")) {
    const days = parseInt(duration);
    endDate.setDate(endDate.getDate() + days);
  } else if (duration.includes("month")) {
    const months = parseInt(duration);
    endDate.setMonth(endDate.getMonth() + months);
  } else if (duration.includes("year")) {
    const years = parseInt(duration);
    endDate.setFullYear(endDate.getFullYear() + years);
  }

  return endDate;
}
