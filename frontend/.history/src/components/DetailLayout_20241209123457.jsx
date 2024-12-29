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
        <div className="flex flex-col md:flex-row max-w-5xl mx-auto p-6 space-y-6 md:space-y-0 md:space-x-6">
          {/* Left: Chart (adjust width ratio here) */}
          <div className="flex-[3] bg-white p-4 rounded-lg shadow-lg">
            <DetailApexChart />
          </div>
  
          {/* Right: Details (adjust width ratio here) */}
          <div className="flex-[2] bg-gray-100 p-6 rounded-lg shadow-lg space-y-6">
            <AddWatchlistButton />
            <DetailTable />
            <BuySellComponent />
          </div>
        </div>
      </BaseLayout>
    );
  };
export default DetailLayout;
