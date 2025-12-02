import React, { useEffect, useState } from "react";
import { fetchTransactions } from "./api";
import { groupByMonth, calculatePoints } from "./rewards";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Customer Reward Points</h1>

      {data.map(customer => {
        const monthly = groupByMonth(customer.transactions);

        const total = Object.values(monthly).reduce(
          (sum, m) => sum + m,
          0
        );

        return (
          <div
            key={customer.customerId}
            style={{
              border: "1px solid #ccc",
              marginBottom: "20px",
              padding: "15px",
              borderRadius: "8px"
            }}
          >
            <h2>{customer.name}</h2>

            <table width="100%" border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(monthly).map(([month, pts]) => (
                  <tr key={month}>
                    <td>{month}</td>
                    <td>{pts}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>{total}</strong></td>
                </tr>
              </tfoot>
            </table>

            <h3 style={{ marginTop: "15px" }}>Transactions</h3>
            <ul>
              {customer.transactions.map((t, idx) => (
                <li key={idx}>
                  ${t.amount} on {t.date} → {calculatePoints(t.amount)} points
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
