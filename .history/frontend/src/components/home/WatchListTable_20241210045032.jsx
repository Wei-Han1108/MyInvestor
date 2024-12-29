import { Card, Table } from "flowbite-react";
import { Link, data } from "react-router-dom";
import { useGetWatchlistsQuery } from "../../slices/watchlistApiSlice";
import Loader from "../Loader";
import Message from "../Message";

const WatchListTable = () => {
  const { data: watchListData, isLoading, isError, error } = useGetWatchlistsQuery();

  return (
    <>
    {isLoading ? (
      <h2><Loader /></h2>
    ) : isError ? (
      <Message boolean={false}>Error: { error?.data?.message ||error.message}</Message>
    ) : (
    <Card className="h-80 w-full">
            <Message boolean={true}>Hello</Message>

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
                  to={`/details/watchlists/${stock._id}`}
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
    )}</>
  );
};

export default WatchListTable;
