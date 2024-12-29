import Header from './Header';
import MySidebar from './MySidebar';
import MyFooter from './MyFooter';

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
          <div className="grid grid-cols-2 gap-0"></div>
        </main>
      </div>

      {/* Footer 在底部，宽度 100% */}
      <MyFooter className="w-full" />
      </div>
    );
  }
  

export default Layout;
