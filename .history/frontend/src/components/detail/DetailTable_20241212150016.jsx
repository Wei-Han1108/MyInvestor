import React, { useState } from "react";
import { useGetStoragesDetailQuery } from "../../slices/watchlistApiSlice";
import { useParams } from "react-router-dom";
import { Card } from "flowbite-react";

const DetailTable = () => {
    const { source, id } = useParams(); // 从 URL 中获取 source 和 id
    console.log('Received source(Table):', source, 'id:', id); // 确认 useParams 是否工作正常
    const { data: stockDetails, isLoading, isError, error } = useGetStoragesDetailQuery(id); 
    console.log('Received stock data:', stockDetails);
    

  return (
    <>
    <Card className="h-96 w-full">
        <h5>stockDetails.name</h5>
    </Card>
    </>
  );
};
}
export default DetailTable;
