function isLaunchDate(): boolean {
  const today = new Date().getTime();

  // Always use local midnight: October = 9 (zero-based months)
  const launchDate = new Date("2025-10-01T00:00:00").getTime();

  if (today >= launchDate) return true;
  return false;
}

export const isLaunched = isLaunchDate();
