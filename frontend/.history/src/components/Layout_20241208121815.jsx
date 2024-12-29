import Header from './Header';
import MySidebar from './MySidebar';
import MyFooter from './MyFooter';

const Layout = ({ children }) => {
    return (
      <div>
        
        <div className="flex flex-col h-screen">
      {/* Header 在顶部，宽度 100% */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar 在左侧 */}
        <MySidebar />

        {/* Main 内容在右侧，占满剩余空间 */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>

      {/* Footer 在底部，宽度 100% */}
      <MyFooter />
    </div>
      </div>
    );
  }
  

export default Layout;
