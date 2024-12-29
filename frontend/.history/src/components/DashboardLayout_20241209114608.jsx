import Header from './Header';
import MySidebar from './MySidebar';
import MyFooter from './MyFooter';
import StockTable from './StockTable';
import DonutChart from './DonutChart';
import WatchListTable from './WatchListTable';
import ApexChart from './ApexChart';
const DashboardLayout = ({ children }) => {
    return (
      <div >
      <Header className="w-full"/>
      <div className="pt-12">
      <div className="flex p-4">
        <MySidebar className="flex-1 p-4"/>
        <main className="flex-1">
          {children}
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
            </main>
          </div>
      </div>
      {/* Footer 在底部，宽度 100% */}
      <MyFooter className="w-full" />
      </div>
    );
  }
  
export default DashboardLayout;
