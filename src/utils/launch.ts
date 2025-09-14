export function isLaunchDate(): boolean {
  const today = new Date();

  // Launch date: October 1, 2025
  const launchDate = new Date("2025-10-01T00:00:00");

  return (
    today.getFullYear() === launchDate.getFullYear() &&
    today.getMonth() === launchDate.getMonth() &&
    today.getDate() === launchDate.getDate()
  );
}
