import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetStoragesQuery } from "../../slices/watchlistApiSlice";
import { useParams } from "react-router-dom";

const DetailTable = () => {
  const [stockDetails, setStockDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // // AlphaVantage API configuration
  // const API_KEY = "LGN314BMZQPOI8TL";
  // const BASE_URL = "https://www.alphavantage.co/query";

  // Fetch stock data from API
  const fetchStockDetails = async () => {
    
    const { source, id } = useParams(); // 从 URL 中获取 source 和 id
    console.log('Received source:', source, 'id:', id); // 确认 useParams 是否工作正常
    const [stock, setStock] = useState(null); // 确保 hooks 在顶层调用
    useEffect(() => {
      const fetchStock = async () => {
        if (!source || !id) return; // 确保 source 和 id 可用
        try {
          const { data } = await axios.get(`/api/storages/${id}`);
          Promise
          console.log("Received stock data:", data); // 输出返回的数据
          setStock(data); // 设置 stock 数据
        } catch (error) {
          console.error("Error fetching stock details:", error);
          console.error("Error message:", error.message); // 输出错误信息
        }
      };
  
      fetchStock();
    }, [source, id]); // 确保 useEffect 在 source 和 id 变化时调用
    console.log('Received stock data:', stock);  

      setStockDetails([
        { label: "Stock Name", value: stock.name },
        { label: "Share Amount", value: stock.shareAmount },
        { label: "Price", value: stock.price },
        { label: "Change", value: stock.change },
        { label: "Current Value", value: stock.currentValue },
        { label: "Percent Change",value: stock.percentChange },
      ]);

      setLoading(false);

      useEffect(() => {
        fetchStockDetails();
      }, []);

  // Render loading or error state
  // if (loading) return <p>Loading stock details...</p>;
  // if (error) return <p className="text-red-500">{error}</p>;

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
