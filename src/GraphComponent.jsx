import BarChartComponent from "./DonationsByAmountBar";
import TotalDonationDollars from "./TotalDonationDollars";
import React from "react";

export default function GraphComponent({ donorData, selectedBox }) {
  console.log(selectedBox.target.innerText);
  return (
    <div className="graph-component">
      <h3>Graph + {selectedBox.target.innerText}</h3>
      <div className="all-charts-wrapper">
        <div className="single-chart-wrapper">
          <h3 className="chart-header">Number of Donations by Amount:</h3>
          <BarChartComponent data={donorData} selectedBox={selectedBox} />
        </div>
        <div className="single-chart-wrapper">
          <h3 className="chart-header">Total Donation Dollars in Millions:</h3>
          <TotalDonationDollars data={donorData} selectedBox={selectedBox} />
        </div>
      </div>
    </div>
  );
}
