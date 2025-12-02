export function calculatePoints(amount) {
  let points = 0;

  if (amount > 100) {
    points += (amount - 100) * 2; // 2 pts per dollar > 100
    points += 50;                 // 1pt per dollar from 50 to 100
  } else if (amount > 50) {
    points += (amount - 50) * 1;  // only tier 50–100
  }

  return points;
}

export function groupByMonth(transactions) {
  const result = {};

  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString("default", { month: "short" });
    const points = calculatePoints(t.amount);

    if (!result[month]) result[month] = 0;
    result[month] += points;
  });

  return result;
}
