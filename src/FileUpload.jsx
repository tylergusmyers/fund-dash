import { useState } from "react";
import { read, utils } from "xlsx";
import BarChartComponent from "./DonationsByAmountBar";
import TotalDonationDollars from "./TotalDonationDollars";

export default function FileUpload() {
  const [data, setData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = utils.sheet_to_json(worksheet, { header: 1 });
      setData(parsedData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      {data ? (
        <div className="all-charts-wrapper">
          <div className="single-chart-wrapper">
            <h3 className="chart-header">Number of Donations by Amount:</h3>
            <BarChartComponent data={data} />
          </div>
          <div className="single-chart-wrapper">
            <h3 className="chart-header">
              Total Donation Dollars in Millions:
            </h3>
            <TotalDonationDollars data={data} />
          </div>
        </div>
      ) : (
        <form>
          <input
            className="file-input"
            type="file"
            onChange={handleFileUpload}
          />
        </form>
      )}
    </>
  );
}
