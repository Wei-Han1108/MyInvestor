import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetStoragesQuery } from "../../slices/watchlistApiSlice";

const DetailTable = () => {
  const [stockDetails, setStockDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // AlphaVantage API configuration
  const API_KEY = "LGN314BMZQPOI8TL";
  const BASE_URL = "https://www.alphavantage.co/query";

  // Fetch stock data from API
  const fetchStockDetails = async () => {
    
    const { data: stockStorage, isLoading, isError, error } = useGetStoragesQuery(); 
    stockStorage.map((stock) => (
      console.log(stock.price)
    ))
      setStockDetails([
        { label: "Stock Name", value: data.name },
        { label: "Share Amount", value: data.shareAmount },
        { label: "Price", value: data.price },
        { label: "Change", value: data.change },
        { label: "Current Value", value: data.currentValue },
        { label: "Percent Change",value: data.percentChange },
      ]);

      setLoading(false);

  useEffect(() => {
    fetchStockDetails();
  }, []);

  // Render loading or error state
  if (loading) return <p>Loading stock details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Render stock details in a table
  return (
    <div className="overflow-x-auto my-2">
      <table className="table-auto w-full text-xs text-left text-gray-500 border">
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
              <td className="px-6 py-3 font-medium text-gray-900">
                {detail.label}
              </td>
              <td className="px-6 py-3">{detail.value || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
}
export default DetailTable;