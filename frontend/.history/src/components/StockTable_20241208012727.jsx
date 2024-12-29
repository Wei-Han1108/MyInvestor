import React from "react";
import { Table } from "flowbite-react";
import stockStorage from "../stockStorage";
const StockTable = ( ) => {
  return (
    <Table>
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
        {stockStorage.map((stock) => (
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
                stock.percentChange >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {stock.percentChange.toFixed(2)}%
            </Table.Cell>
            <Table.Cell>
              <a
                href="#"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default StockTable;
