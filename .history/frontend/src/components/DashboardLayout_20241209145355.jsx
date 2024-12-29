import StockTable from './home/StockTable';
import DonutChart from './home/DonutChart';
import WatchListTable from './home/WatchListTable';
import ApexChart from './home/ApexChart';
import BaseLayout from './BaseLayout';
const DashboardLayout = ({ children }) => {
    return (
      <div >
      <BaseLayout>         
       <div className="p-1">
            <div className="grid grid-cols-10 grid-rows-2 gap-1">
              <div className="col-span-4">
                <WatchListTable >          
                </WatchListTable>
              </div>
              <div className="col-span-6">
                <ApexChart>
                </ApexChart>
              </div>
              <div className="col-span-7">
                <StockTable>  
                </StockTable>
              </div>
              <div className="col-span-3">
                <DonutChart>
                </DonutChart>
              </div>
            
          </div>
          </div>
          </BaseLayout>
     
      </div>
    );
  }
  
export default DashboardLayout;
