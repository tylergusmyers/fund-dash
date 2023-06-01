import { useState } from "react";
import { read, utils } from "xlsx";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import GraphComponent from "./GraphComponent";
import axios from "axios";

export default function Home() {
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
