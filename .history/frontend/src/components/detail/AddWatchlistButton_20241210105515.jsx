import React from "react";
import { Button } from "flowbite-react";
const AddWatchlistButton = () => {
  
  return (
    <div className="flex justify-center">
      <Button className="bg-blue-600 disabled:bg-gray-400 text-white font-bold px-4 rounded-lg shadow-md">
        Added to WatchList
      </Button>
    </div>
  );
};

export default AddWatchlistButton;
