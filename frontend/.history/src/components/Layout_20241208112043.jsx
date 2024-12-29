import Header from './Header';
import Sidebar from './Sidebar';
import MyFooter from './MyFooter';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col w-full">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1 p-4 ml-64">
          {children}
        </main>

        {/* Footer */}
        <MyFooter />
      </div>
    </div>
  );
};

export default Layout;
