import React from "react";
import { Button } from "flowbite-react";
import { useState } from "react";
const AddWatchlistButton = () => {
  //如果button被点击
  const [isClicked, setIsClicked] = useState(false);
  
  return (
    <div className="flex justify-center">
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded-lg shadow-md"
        onClick={() => setIsClicked(!isClicked)}
      >
        {isClicked ? "Added to WatchList" : "Add to WatchList"}
      </Button>
    </div>
  );
};

export default AddWatchlistButton;
