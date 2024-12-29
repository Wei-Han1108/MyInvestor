import Header from './Header';
import MySidebar from './MySidebar';
import MyFooter from './MyFooter';
import { Card } from 'flowbite-react';
import StockTable from './StockTable';
import DonutChart from './DonutChart';
import WatchListTable from './WatchListTable';
const DashboardLayout = ({ children }) => {
    return (
      <div >
      {/* Header 在顶部，宽度 100% */}
      <Header className="w-full"/>
      <div className="pt-12">
      <div className="flex p-4">
        {/* Sidebar 在左侧 */}
        <MySidebar className="flex-1 p-4"/>

        {/* Main 内容在右侧，占满剩余空间 */}
        <main className="flex-1 p-2">
          {children}
          
        <div className="p-2">
          {/* 网格布局，3列2行 */}
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            
            {/* 第一行的第一列 */}
            <div className="col-span-1.5">
              <WatchListTable className="h-full">
                
              </WatchListTable>
            </div>

            {/* 第一行的第二列 */}
            <div className="col-span-1.5">
              <Card className="h-full">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                  Small Card
                </h5>
                <p>This is a single-column card.</p>
              </Card>
            </div>

            {/* 第二行的第一列 */}
            <div className="col-span-2">
              <StockTable className="h-full">  
              </StockTable>
            </div>

            {/* 第二行的后两列 (合并2列) */}
            <div className="col-span-1">
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
