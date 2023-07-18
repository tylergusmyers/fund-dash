import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function DollarTotals({ donorData }) {
  const [filteredNames, setFilteredNames] = useState([]);

  // Extracting labels, values, and names from data
  const names = donorData.slice(1).map((item) => item[1]);
  console.log(donorData[1][3]); // Use item[1] for the name
  // Use item[1] for the name

  // Apply name filtering
  const filteredData = donorData
    .slice(1)
    .filter((item) => filteredNames.includes(item[1])); // Use item[1] for the filtering

  const totalDollars = {
    "Total Amount USD $": filteredData.reduce((acc, curr) => {
      const donationAmount = curr[4] || "";
      return acc + (isNaN(donationAmount) ? 0 : parseInt(donationAmount));
    }, 0),
  };

  const chartData = [
    {
      label: "Total Amount",
      USD: totalDollars["Total Amount USD $"],
    },
  ];

  const data = filteredData.map((item, index) => ({
    id: index + 1,
    Date: formatDate(item[3]),
    Amount: item[4] || 0,
    Name: item[1], // Use item[1] for the name
  }));

  const columns = [
    { field: "Date", headerName: "Date", width: 200 },
    { field: "Amount", headerName: "Amount", width: 200 },
    { field: "Name", headerName: "Name", width: 200 },
  ];

  function formatDate(dateString) {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const date = new Date(
      (dateString - 1) * millisecondsPerDay + Date.UTC(1900, 0, 1)
    );
    return date.toLocaleDateString();
  }

  function handleFilterChange(event) {
    const selectedNames = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFilteredNames(selectedNames);
  }

  return (
    <div>
      <h3>Total Donation Dollars</h3>
      <div>
        <select multiple onChange={handleFilterChange}>
          {names.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="single-chart-wrapper">
        <div
          className="data-grid-wrapper"
          style={{ height: 400, width: "100%" }}
        >
          <DataGrid rows={data} columns={columns} pageSize={5} />
        </div>
        <div className="bar-chart-wrapper">
          <BarChart width={500} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="USD" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
