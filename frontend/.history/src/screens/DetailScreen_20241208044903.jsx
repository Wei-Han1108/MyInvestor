import React from 'react'
import { useParams } from 'react-router-dom';
import  StockStorageData  from '../StockStorageData';
const DetailScreen = () => {
  const { id: stockId } = useParams();
  const stock = StockStorageData.find((item) => item._id === stockId);
  return (
    <div>
      <h1>Detail Screen for Stock ID: {stockId}</h1>
      <p>Name: {stock.name}</p>
      <p>Price: {stock.price}</p>
      <p>Share Amount: {stock.shareAmount}</p>
    </div>
  )
}

export default DetailScreen
