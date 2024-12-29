import React from "react";
import { Button } from "flowbite-react";
const AddWatchlistButton = () => {
  return (
    <div className="flex justify-center">
      <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-lg shadow-md">
        Add to WatchList
      </Button>
    </div>
  );
};

export default AddWatchlistButton;
