import Header from './Header';
import MySidebar from './MySidebar';
import MyFooter from './MyFooter';
import { Card } from 'flowbite-react';

const Layout = ({ children }) => {
    return (
      <div >
              {/* Header 在顶部，宽度 100% */}
      <Header className="w-full"/>

      <div className="flex">
        {/* Sidebar 在左侧 */}
        <MySidebar className="flex-1 p-4"/>

        {/* Main 内容在右侧，占满剩余空间 */}
        <main className="flex-1 p-4">
          {children}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 p-4 h-100 rounded-lg shadow-md">
              <Card>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Card title
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
                  chronological order.
                </p>
              </Card>
            </div> 
            <div className="bg-gray-200 p-4 h-100 rounded-lg shadow-md">
              Card 2
            </div>
            <div className="bg-gray-200 p-4 h-100 rounded-lg shadow-md">
              Card 3
            </div>
            <div className="bg-gray-200 p-4 h-100 rounded-lg shadow-md">
              Card 4
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
