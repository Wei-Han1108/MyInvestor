import React, { useState, useEffect } from "react";
import { Card, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
const WatchListTable = () => {
  const [watchListData, setWatchListData] = useState([]); // 初始化为空数组

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/watchlist");
        setWatchListData(Array.isArray(data) ? data : []);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setWatchListData([]); // Fallback to an empty array
      }
    };    
    fetchData();
  }, []);

  return (
    <Card className="h-80 w-full">
    <h5 className="text-xl font-bold p-1">
        WatchList:
    </h5>
      <div className="overflow-y-auto">
    <Table hoverable={true}>
      <Table.Head>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
        <Table.HeadCell>Percent Change</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Action</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {watchListData.length > 0 ? (
          watchListData.map((stock) => (
            <Table.Row
              key={stock._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {stock.name}
              </Table.Cell>
              <Table.Cell>{stock.price.toFixed(2)}</Table.Cell>
              <Table.Cell
                className={
                  stock.percentChange >= 0 ? "text-green-500" : "text-red-500"
                }
              >
                {stock.percentChange.toFixed(2)}%
              </Table.Cell>
              <Table.Cell>
                <Link
                  to={`/detail/${stock._id}`}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Remove
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
    </Card>
  );
};

export default WatchListTable;
