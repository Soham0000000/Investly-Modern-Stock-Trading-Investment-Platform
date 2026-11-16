import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3802";
const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" });

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    const fetchHoldings = () => {
      axios.get(`${apiUrl}/allHoldings`).then((res) => {
        setAllHoldings(res.data);
      });
    };

    fetchHoldings();
    window.addEventListener("holdings:updated", fetchHoldings);

    return () => window.removeEventListener("holdings:updated", fetchHoldings);
  }, []);

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const labels = allHoldings.map((subArray) => subArray["name"]);
  const investedValue = allHoldings.reduce((total, stock) => total + stock.avg * stock.qty, 0);
  const currentValue = allHoldings.reduce((total, stock) => total + stock.price * stock.qty, 0);
  const profitLoss = currentValue - investedValue;
  const profitPercent = investedValue > 0 ? (profitLoss / investedValue) * 100 : 0;

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // export const data = {
  //   labels,
  //   datasets: [
  // {
  //   label: 'Dataset 1',
  //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
  // },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {allHoldings.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{currency.format(investedValue)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{currency.format(currentValue)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>{currency.format(profitLoss)} ({profitPercent >= 0 ? "+" : ""}{profitPercent.toFixed(2)}%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
