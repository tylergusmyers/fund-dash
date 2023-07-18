import React from "react";
import NumberOfDonations from "./NumberOfDonations";
import DollarTotals from "./DollarTotals";

export default function GraphComponent({ selectedBox, donorData }) {
  const boxTitle = selectedBox.target.innerText;
  console.log(boxTitle);
  return (
    <div className="graph-component">
      <div className="all-charts-wrapper">
        {boxTitle === "Number-of-Donations" ? (
          <NumberOfDonations donorData={donorData} />
        ) : null}
        {boxTitle === "Dollar-Totals" ? (
          <DollarTotals donorData={donorData} />
        ) : null}
      </div>
    </div>
  );
}
