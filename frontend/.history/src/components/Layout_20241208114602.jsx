import Header from './Header';
import Sidebar from './Sidebar';
import MyFooter from './MyFooter';

const Layout = ({ children }) => {
    return (
        <div className="h-screen overflow-y-auto">
          {/* Header */}
          <Header />
    
          <div className="flex">
            <Sidebar className="w-64 bg-gray-200 h-screen fixed top-0 left-0" />
            <main className="flex-1 ml-64 p-4">
              {children}
            </main>
          </div>
    
          {/* Footer */}
          <MyFooter />
        </div>
      );
  }
  

export default Layout;
