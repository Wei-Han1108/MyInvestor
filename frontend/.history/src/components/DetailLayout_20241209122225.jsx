import BaseLayout from './BaseLayout';
import DetailApexChart from './DetailApexChart';
import DetailTable from './detail/DetailTable';
import BuySellComponent from './detail/BuySellComponent';
import AddWatchlistButton from './detail/AddWatchlistButton';
import
const DetailLayout = ({ children }) => {
    return (
      <div >
        <BaseLayout>         
            <DetailApexChart />
            <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
                <AddWatchlistButton />
                <DetailTable />
                <BuySellComponent />
            </div>

        </BaseLayout>
     
      </div>
    );
  }
  
export default DetailLayout;
