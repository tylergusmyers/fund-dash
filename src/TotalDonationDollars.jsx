import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment";

export default function TotalDonationDollars({ data }) {
  // Extracting labels and values from data
  const labels = data.map((item) =>
    moment(item["Donation Date"], "MM/DD/YYYY").format("MMM DD, YYYY")
  );
  const values = data.map((item) => {
    const donationAmount = item[1] || "";
    return isNaN(donationAmount) ? 0 : donationAmount;
  });

  const totalDollars = {
    "Total Amount USD $": values.reduce((acc, curr) => acc + curr),
  };

  const chartData = [
    {
      label: "Total Amount (millions)",
      USD: totalDollars["Total Amount USD $"] / 1000000,
    },
  ];

  return (
    <>
      <BarChart width={500} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="USD" fill="#8884d8" />
      </BarChart>
    </>
  );
}
