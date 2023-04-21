import React, { useState } from 'react';
import { read, utils } from 'xlsx';
import BarChartComponent from './BarChart';

export default function App() {
  const [data, setData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = utils.sheet_to_json(worksheet, { header: 1 });
      setData(parsedData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <form>
        <input type="file" onChange={handleFileUpload} />
      </form>
      {data && <BarChartComponent data={data} />}
    </div>
  );
}






