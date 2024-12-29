import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetStoragesDetailQuery } from "../../slices/watchlistApiSlice";
import { useParams } from "react-router-dom";
import { Card } from "flowbite-react";

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
    console.log('Received source(Table):', source, 'id:', id); // 确认 useParams 是否工作正常
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
