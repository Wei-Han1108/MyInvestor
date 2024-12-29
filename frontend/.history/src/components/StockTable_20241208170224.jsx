import React, { useState, useEffect } from "react";
import { Card, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import StockStorageData from "../StockStorageData";
const StockTable = () => {
  const [stockStorage, setStockStorage] = useState([]); // 初始化为空数组

  useEffect(() => {
    // 模拟 API 数据加载
    const fetchData = async () => {
      const data = StockStorageData; // 生成数据
      setStockStorage(data); // 更新数据
    };
    fetchData();
  }, []);

  return (
    <Card >
      <div className="overflow-y-auto max-h-64">
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
        {stockStorage.length > 0 ? (
          stockStorage.map((stock) => (
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
                  to={`/detail/${stock._id}`}
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
    </Card>
  );
};

export default StockTable;
