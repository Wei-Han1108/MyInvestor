import React from "react";
import { useGetStoragesDetailQuery } from "../../slices/watchlistApiSlice";
import { useParams } from "react-router-dom";

const DetailTable = () => {
    const { source, id } = useParams(); // 从 URL 中获取 source 和 id
    console.log('Received source(Table):', source, 'id:', id); // 确认 useParams 是否工作正常
    const { data: stockDetails, isLoading, isError, error } = useGetStoragesDetailQuery(id); 
    console.log('Received stock data:', stockDetails);


    return (
        <>
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Property</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="border border-gray-300 px-4 py-2">Stock Name</td>
                    <td className="border border-gray-300 px-4 py-2">{stockDetails?.name ?? 'N/A'}</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-4 py-2">Share Amount</td>
                    <td className="border border-gray-300 px-4 py-2">{stockDetails?.shareAmount ?? 'N/A'}</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-4 py-2">Price</td>
                    <td className="border border-gray-300 px-4 py-2">{stockDetails?.price ?? 'N/A'}</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-4 py-2">Change</td>
                    <td className={`border border-gray-300 px-4 py-2 ${stockDetails?.change > 0 ? 'text-green-500' : stockDetails?.change < 0 ? 'text-red-500' : ''}`}>{stockDetails?.change ?? 'N/A'}</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-4 py-2">Current Value</td>
                    <td className="border border-gray-300 px-4 py-2">{stockDetails?.currentValue ?? 'N/A'}</td>
                </tr>
                <tr>
                    <td className="border border-gray-300 px-4 py-2">Percent Change</td>
                    <td className="border border-gray-300 px-4 py-2">{stockDetails?.percentChange ?? 'N/A'}</td>
                </tr>
                </tbody>
            </table>
        </>
      );
};
export default DetailTable;
