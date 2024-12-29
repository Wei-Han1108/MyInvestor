import Header from './Header';
import Sidebar from './Sidebar';
import MyFooter from './MyFooter';

const Layout = ({ children }) => {
    return (
      <div className="flex flex-col h-screen">
        {/* Header */}
        <Header />
  
        {/* Main content */}
        <div className="flex flex-1 min-h-0">
          <Sidebar className="w-64 bg-gray-200 h-full" />
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
  
        {/* Footer */}
        <MyFooter />
      </div>
    );
  }
  

export default Layout;
