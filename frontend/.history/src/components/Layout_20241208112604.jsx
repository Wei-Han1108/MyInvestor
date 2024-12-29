import Header from './Header';
import Sidebar from './Sidebar';
import MyFooter from './MyFooter';

const Layout = ({ children }) => {
  return (


      <div className="flex flex-col w-full">
        {/* Header */}
        <Header />
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            {/* Main content */}
            <main className="flex-1 p-4 ml-64">
              {children}
            </main>
        </div>
        {/* Footer */}
        <MyFooter />
      </div>
  );
};

export default Layout;
