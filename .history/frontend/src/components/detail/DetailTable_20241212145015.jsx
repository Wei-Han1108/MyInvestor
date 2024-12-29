import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetStoragesDetailQuery } from "../../slices/watchlistApiSlice";
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
    const { data: stockDetails, isLoading, isError, error } = useGetStoragesDetailQuery(id); 
    console.log('Received stock data:', stockDetails);
    

    setStockDetails([
    { label: "Stock Name", value: stockDetails.name },
    { label: "Share Amount", value: stockDetails.shareAmount },
    { label: "Price", value: stockDetails.price },
    { label: "Change", value: stockDetails.change },
    { label: "Current Value", value: stockDetails.currentValue },
    { label: "Percent Change",value: stockDetails.percentChange },
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
    <>
    {isLoading ? (
      <h2><Loader /></h2>
    ) : isError ? (
      <Message boolean={false} message={error?.data?.message || error.message}> </Message>
    ) : (<Card className="h-96 w-full">
    <h5 className="text-xl font-bold">
    My Invest
    </h5>
      <div className="overflow-y-auto ">
    <Table hoverable={true}>
      <Table.Head>
        <Table.HeadCell>Stock Name</Table.HeadCell>
        <Table.HeadCell>Share Amount</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
        <Table.HeadCell>Change</Table.HeadCell>
        <Table.HeadCell>Current Value</Table.HeadCell>
        <Table.HeadCell>Percent Change</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Edit</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {stockDetails.length > 0 ? (
          stockDetails.map((stock) => (
            <Table.Row
              key={stock._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {stock.name}
              </Table.Cell>
              <Table.Cell>{stock.shareAmount}</Table.Cell>
              <Table.Cell>${stock.price.toFixed(2)}</Table.Cell>
              <Table.Cell>{stock.change.toFixed(2)}</Table.Cell>
              <Table.Cell>${stock.currentValue.toFixed(2)}</Table.Cell>
              <Table.Cell
                className={
                  stock.percentChange >= 0 ? "text-green-500" : "text-red-500"
                }
              >
                {stock.percentChange.toFixed(2)}%
              </Table.Cell>
              <Table.Cell>
                <Link
                  to={`/details/storages/${stock._id}`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </Link>
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={7} className="text-center">
              No stock data available.
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
      </div>
    </Card>)  
    }
    </>
  );
};
}
export default DetailTable;
