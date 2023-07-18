import React, { useState } from "react";
import moment from "moment";

export default function DateFilter({ donorData }) {
  const [filteredData, setFilteredData] = useState(donorData);
  const [dateWindow, setDateWindow] = useState("all");

  const handleDateWindowChange = (window) => {
    setDateWindow(window);

    if (window === "all") {
      setFilteredData(donorData);
    } else {
      const startDate = getStartDate(window);
      const filteredData = filterByDateRange(donorData, startDate);
      setFilteredData(filteredData);
    }
  };

  const getStartDate = (window) => {
    const currentDate = moment();
    switch (window) {
      case "1month":
        return currentDate.clone().subtract(1, "month");
      case "6months":
        return currentDate.clone().subtract(6, "months");
      case "1year":
        return currentDate.clone().subtract(1, "year");
      default:
        return null;
    }
  };

  const filterByDateRange = (data, startDate) => {
    if (!startDate) {
      return data;
    }

    const filteredData = data.filter((item) => {
      const donationDate = moment(item[3], "MM/DD/YYYY");
      return donationDate.isAfter(startDate) || donationDate.isSame(startDate);
    });

    return filteredData;
  };

  return (
    <div>
      <h3>Total Donation Dollars</h3>
      <div>
        <button onClick={() => handleDateWindowChange("1month")}>
          1 Month
        </button>
        <button onClick={() => handleDateWindowChange("6months")}>
          6 Months
        </button>
        <button onClick={() => handleDateWindowChange("1year")}>1 Year</button>
        <button onClick={() => handleDateWindowChange("all")}>All Time</button>
      </div>
    </div>
  );
}
