import { useEffect, useState } from "react";
import { read, utils } from "xlsx";
import { Link, Route, Routes, useParams, useNavigate } from "react-router-dom";
import BarChartComponent from "./DonationsByAmountBar";
import TotalDonationDollars from "./TotalDonationDollars";
import ClickableBox from "./ClickableBox";

export default function FileUpload() {
  const [data, setData] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const boxNames = [
    "Box-1",
    "Box-2",
    "Box-3",
    "Box-4",
    "Box-5",
    "Box-6",
    "Box-7",
    "Box-8",
  ];
  const navigate = useNavigate();

  const handleBoxClick = (boxName) => {
    setSelectedBox(boxName);
    navigate(`/graph/${boxName}`);
  };

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
        <Routes>
          <Route
            path="/graph/:boxName"
            element={<GraphComponent donorData={data} />}
          />
          <Route
            path="/"
            element={
              <div>
                <h2>Clickable Boxes</h2>
                <div className="select-box-container">
                  {boxNames.map((name) => (
                    <ClickableBox
                      className="select-box"
                      donorData={data}
                      key={name}
                      name={name}
                      onClick={() => handleBoxClick(name)}
                      selected={selectedBox === name}
                    />
                  ))}
                </div>
                <div>hello</div>
              </div>
            }
          />
        </Routes>
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

const GraphComponent = (donorData) => {
  const params = useParams();
  const { boxName } = params;

  return (
    <div className="graph-component">
      <h3>Graph + {boxName}</h3>
      <div className="all-charts-wrapper">
        <div className="single-chart-wrapper">
          <h3 className="chart-header">Number of Donations by Amount:</h3>
          <BarChartComponent data={donorData} />
        </div>
        <div className="single-chart-wrapper">
          <h3 className="chart-header">Total Donation Dollars in Millions:</h3>
          <TotalDonationDollars data={donorData} />
        </div>
      </div>
    </div>
  );
};

//   const getData = async () => {
//     try {
//       const res = await fetch(
//         "https://sheet.best/api/sheets/882ade6b-7252-4d45-a5e6-cef3a971123f"
//       );
//       const datam = await res.json();
//       console.log(datam);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => setData(getData()), []);
