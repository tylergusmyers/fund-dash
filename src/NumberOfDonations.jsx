import React from "react";
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

export default function NumberOfDonations({ donorData }) {
  // Extracting labels and values from data
  const labels = donorData.slice(1).map((item) => item[4]);
  const values = donorData.slice(1).map((item) => parseFloat(item[4]));

  // Categorize data into three size categories
  const categories = {
    "< $1000": 0,
    "$1000 - $5000": 0,
    "> $5000": 0,
  };

  values.forEach((value) => {
    if (value < 1000) {
      categories["< $1000"]++;
    } else if (value >= 1000 && value <= 5000) {
      categories["$1000 - $5000"]++;
    } else {
      categories["> $5000"]++;
    }
  });

  // Convert categories object into an array of objects
  const chartData = Object.keys(categories).map((category) => ({
    label: category,
    "Number of Donors": categories[category],
  }));

  // Convert data to rows for DataGrid
  const dataRows = labels.map((label, index) => ({
    id: index + 1,
    Date: label,
    Amount: values[index],
  }));

  const columns = [
    { field: "Date", headerName: "Date", width: 200 },
    { field: "Amount", headerName: "Amount", width: 200 },
  ];

  return (
    <div>
      <h3>Donations By Amount</h3>
      <div className="single-chart-wrapper">
        <div
          className="data-grid-wrapper"
          style={{ height: 400, width: "100%" }}
        >
          <DataGrid rows={dataRows} columns={columns} pageSize={5} />
        </div>
        <div
          className="data-grid-wrapper"
          style={{ height: 400, width: "100%" }}
        >
          <BarChart width={500} height={400} data={chartData}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Number of Donors" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
