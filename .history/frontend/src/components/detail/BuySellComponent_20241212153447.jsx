import React, { useState } from "react";
import { useGetStoragesDetailQuery } from "../../slices/watchlistApiSlice";
import { use } from "react";
import { useParams } from "react-router-dom";
const BuySellComponent = () => {
  const { id } = useParams();
  const { data: stockDetails, isLoading, isError, error } = useGetStoragesDetailQuery(id); 
  const [quantity, setQuantity] = useState(1);

  // Handlers for increment and decrement
  const increment = () => {
    setQuantity(quantity + 1);
  }
  const decrement = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  }
  // 按键后弹出操作成功
  const handleBuy = () => {
    alert(`buy ${quantity} count`);
  };
  const handleSell = () => {
    alert(`sell ${quantity} count`);
  };
  // BuySell
  const price = 100;
  return (
    <div className="my-4">
      <div className="flex items-center justify-center space-x-4">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
          onClick={decrement}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 text-center border border-gray-300 rounded-lg focus:outline-none"
        />
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg"
          onClick={increment}
        >
          +
        </button>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md" onClick={handleBuy}>
          Buy
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md" onClick={handleSell}>
          Sell
        </button>
      </div>
      <p className="text-center text-gray-500 mt-2">Subtotal Price: ${(quantity * stockDetails?.currentValue).toFixed(2)}</p>
      <p className="text-center text-gray-500 mt-2">Please select quantity to Buy/Sell.</p>
    </div>
  );
};

export default BuySellComponent;
