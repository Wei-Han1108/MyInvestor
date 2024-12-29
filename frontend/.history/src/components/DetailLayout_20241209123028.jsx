import BaseLayout from './BaseLayout';
import DetailApexChart from './detail/DetailApexChart';
import DetailTable from './detail/DetailTable';
import BuySellComponent from './detail/BuySellComponent';
import AddWatchlistButton from './detail/AddWatchlistButton';
import React from 'react';

const DetailLayout = () => {
    return (
      <BaseLayout>
        {/* Outer container for layout */}
        <div className="flex space-x-4">
          {/* Left: Chart */}
          <div className="flex-1 bg-white p-4 rounded-lg shadow-lg">
            <DetailApexChart />
          </div>
  
          {/* Right: Details */}
          <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-lg space-y-6">
            <AddWatchlistButton />
            <DetailTable />
            <BuySellComponent />
          </div>
        </div>
      </BaseLayout>
    );
  };
  
export default DetailLayout;
