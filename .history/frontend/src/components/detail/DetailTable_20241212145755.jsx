import React from "react";
import { useParams } from "react-router-dom";
import { useGetStoragesDetailQuery } from "../../slices/watchlistApiSlice";
import { Card } from "flowbite-react";

const DetailTable = () => {
  // 从 URL 中获取 source 和 id
  const { source, id } = useParams();
  
  // 从 API 中获取数据
  const { data: stockDetails, isLoading, isError, error } = useGetStoragesDetailQuery(id); 

  console.log('Received source(Table):', source, 'id:', id); // 确认 useParams 是否工作正常
  console.log('Received stock data:', stockDetails); // 确认 API 请求是否正常

  if (isLoading) return <p>加载中...</p>;
  if (isError) return <p>出错了: {error?.message}</p>;

  return (
    <>
      <Card className="h-96 w-full">
        <h5>{stockDetails?.name ?? '未找到数据'}</h5>
        <ul>
          <li>Stock Name: {stockDetails?.name}</li>
          <li>Share Amount: {stockDetails?.shareAmount}</li>
          <li>Price: {stockDetails?.price}</li>
          <li>Change: {stockDetails?.change}</li>
          <li>Current Value: {stockDetails?.currentValue}</li>
          <li>Percent Change: {stockDetails?.percentChange}</li>
        </ul>
      </Card>
    </>
  );
};

export default DetailTable;
