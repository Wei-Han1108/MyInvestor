import Header from './Header';
import MySidebar from './MySidebar';
import MyFooter from './MyFooter';
import { Card } from 'flowbite-react';
import StockTable from './StockTable';
import DonutChart from './DonutChart';
const Layout = ({ children }) => {
    return (
      <div >
              {/* Header 在顶部，宽度 100% */}
      <Header className="w-full"/>

      <div className="flex">
        {/* Sidebar 在左侧 */}
        <MySidebar className="flex-0.1 p-4"/>

        {/* Main 内容在右侧，占满剩余空间 */}
        <main className="flex-1 p-4">
          {children}
          
    <div className="p-8">
      {/* 网格布局，3列2行 */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        
        {/* 第一行的前两列 (合并2列) */}
        <div className="col-span-1">
          <Card className="h-full">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900">
              Big Card (Spans 2 Columns)
            </h5>
            <p>This card spans across 2 columns.</p>
          </Card>
        </div>

        {/* 第一行的第三列 */}
        <div className="col-span-2">
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

      {/* Footer 在底部，宽度 100% */}
      <MyFooter className="w-full" />
      </div>
    );
  }
  

export default Layout;
