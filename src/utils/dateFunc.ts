export function calculateEndDate(startDate: Date, duration: string) {
  const endDate = new Date(startDate);

  if (duration.includes("Day")) {
    const days = parseInt(duration);
    endDate.setDate(endDate.getDate() + days);
  } else if (duration.includes("Month")) {
    const months = parseInt(duration);
    endDate.setMonth(endDate.getMonth() + months);
  } else if (duration.includes("Year")) {
    const years = parseInt(duration);
    endDate.setFullYear(endDate.getFullYear() + years);
  }

  return endDate;
}
