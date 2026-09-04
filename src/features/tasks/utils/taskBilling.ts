export default function calculateBillingPrice(type: string, level: number, duration: string): number {
  const typeRates: Record<string, number> = { link: 200, image: 400, video: 700 };
  const levelRates: Record<number, number> = { 1: 100, 2: 200, 3: 300, 4: 400, 5: 500 };
  const durationMultipliers: Record<string, number> = { "7 days": 1, "14 days": 1.5, "1 month": 2, "3 months": 3.5 };

  const typeRate = typeRates[type] || 0;
  const levelRate = levelRates[level] || 0;
  const multiplier = durationMultipliers[duration] || 1;

  return (typeRate + levelRate) * multiplier;
}
