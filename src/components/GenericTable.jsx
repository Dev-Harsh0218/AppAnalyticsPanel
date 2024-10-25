import React, { useState } from 'react';

const GenericTable = ({ tableData={},tablehead }) => {
  const [isColor, setColor] = useState(true);

  // Convert the input object to an array of objects with keys 'date' and 'totalInstalls'
  const formattedData = Object.keys(tableData).map((key, index) => ({
    sno: index + 1,
    name: key,
    totalInstalls: tableData[key]
  }));
  const isEmpty = formattedData.length === 0;

  return (
    <div className={`table w-full rounded-b-2xl`}>
      {isEmpty ? (
        <h1 className='w-full h-[400px] text-5xl px-20 py-20'>Please Select the Package and Date Range to View Desired Data</h1>
      ) : (
        <div className="bg-white w-full h-[400px]">
          <table className="">
            <thead>
              <tr className="bg-[#CFE1EE]">
                <th className="w-1/12 text-xl py-6 px-1 font-bold text-center text-[#252525]">Sno.</th>
                <th className="w-1/12 text-xl py-6 px-1 font-bold text-center text-[#252525]">{tablehead.field1}</th>
                <th className="w-1/12 text-xl py-6 px-1 font-bold text-center text-[#252525]">{tablehead.field2}</th>
              </tr>
            </thead>
            <tbody>
              {formattedData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#E0F1FB]"}>
                  <td className="py-6 text-center">{row.sno}</td>
                  <td className="py-6 text-center">{row.name}</td>
                  <td className="py-6 text-center">{row.totalInstalls}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GenericTable;
