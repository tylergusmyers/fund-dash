import { useState } from "react";
import { read, utils } from "xlsx";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import GraphComponent from "./GraphComponent";
import DateFilter from "./DateFilter";

export default function Home() {
  const [data, setData] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const boxNames = ["Number-Of-Donations", "Dollar-Totals", "Box-3"];

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
        <div className="home-main-wrapper">
          <nav className="select-box-container">
            {boxNames.map((name) => (
              <Link
                to={`/graph/${name}`}
                className={`select-box ${
                  selectedBox === name ? "selected" : ""
                }`}
                key={name}
                onClick={(boxName) => {
                  setSelectedBox(boxName);
                }}
              >
                {name}
              </Link>
            ))}
            <DateFilter />
          </nav>
          <div className="graph-wrapper">
            <Routes>
              <Route
                path="/graph/:boxName"
                element={
                  <GraphComponent donorData={data} selectedBox={selectedBox} />
                }
              />
              <Route path="/" element={<h3>Please select a box</h3>} />
            </Routes>
            <Outlet />
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
