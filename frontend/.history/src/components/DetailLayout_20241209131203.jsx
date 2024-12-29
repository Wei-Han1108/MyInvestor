import BaseLayout from './BaseLayout';
import DetailApexChart from './detail/DetailApexChart';
import DetailTable from './detail/DetailTable';
import BuySellComponent from './detail/BuySellComponent';
import AddWatchlistButton from './detail/AddWatchlistButton';
import React from 'react';
import { Card } from 'flowbite-react';

const DetailLayout = () => {
    return (
      <BaseLayout>
        {/* Outer container for layout */}
        <div className="flex flex-col md:flex-row max-w-5xl mx-auto p-2 space-y-6 md:space-y-0 md:space-x-6">
          {/* Left: Chart (adjust width ratio here) */}
          <div className="flex-[4]">
            <DetailApexChart />
          </div>
  
          {/* Right: Details (adjust width ratio here) */}
          <Card className="flex-[1] bg-gray-100 p-6 rounded-lg shadow-lg space-y-6">
            <AddWatchlistButton />
            <DetailTable />
            <BuySellComponent />
          </Card>
        </div>
      </BaseLayout>
    );
  };
export default DetailLayout;