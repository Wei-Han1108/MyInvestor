import React from "react";

const DetailTable = () => {
  const stockDetails = [
    { label: "Currency", value: "USD" },
    { label: "Symbol", value: "MSFT" },
    { label: "Exchangename", value: "NMS" },
    { label: "Exchangetimezonename", value: "America/New_York" },
    { label: "Fiftytwoweekhigh", value: "431.055" },
    { label: "Fiftytwoweeklow", value: "424.41" },
    { label: "Regularmarkethigh", value: "431.055" },
    { label: "Regularmarketlow", value: "424.41" },
    { label: "Chartpreviousclose", value: "420.21" },
  ];

  return (
    <div className="overflow-x-auto my-4">
      <table className="table-auto w-full text-sm text-left text-gray-500 border">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Property
            </th>
            <th scope="col" className="px-6 py-3">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {stockDetails.map((detail, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } border-b`}
            >
              <td className="px-6 py-3 font-medium text-gray-900">{detail.label}</td>
              <td className="px-6 py-3">{detail.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailTable;
