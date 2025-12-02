export function fetchTransactions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          customerId: 1,
          name: "Alice",
          transactions: [
            { amount: 120, date: "2025-01-10" },
            { amount: 75, date: "2025-01-20" },
            { amount: 220, date: "2025-02-15" },
            { amount: 35, date: "2025-03-01" }
          ]
        },
        {
          customerId: 2,
          name: "Bob",
          transactions: [
            { amount: 60, date: "2025-01-05" },
            { amount: 150, date: "2025-02-17" },
            { amount: 90, date: "2025-03-22" }
          ]
        }
      ]);
    }, 800); // simulates network delay
  });
}
