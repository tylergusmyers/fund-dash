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

export default function DonationsByAmountBar({ donorData }) {
  //   console.log(donorData);
  //   // Extracting labels and values from data
  //   const labels = donorData.map((item) =>
  //     moment(item["Donation Date"], "MM/DD/YYYY").format("MMM DD, YYYY")
  //   );
  //   const values = donorData.map((item) => {
  //     const donationAmount = item[1] || "";
  //     // const parsedAmount = parseFloat(donationAmount.replace(/[^0-9.]/g, ""));
  //     return isNaN(donationAmount) ? 0 : donationAmount;
  //   });

  //   // Categorize data into three size categories
  //   const categories = {
  //     "< $100": 0,
  //     "$100 - $250": 0,
  //     "> $250": 0,
  //   };

  //   values.forEach((value) => {
  //     if (value < 100) {
  //       categories["< $100"]++;
  //     } else if (value >= 100 && value <= 250) {
  //       categories["$100 - $250"]++;
  //     } else {
  //       categories["> $250"]++;
  //     }
  //   });

  //   // Convert categories object into an array of objects
  //   const chartData = Object.keys(categories).map((category) => ({
  //     label: category,
  //     "Number of Donors": categories[category],
  //   }));

  return (
    <>
      {/* <BarChart width={600} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Number of Donors" fill="#8884d8" />
      </BarChart> */}
    </>
  );
}
