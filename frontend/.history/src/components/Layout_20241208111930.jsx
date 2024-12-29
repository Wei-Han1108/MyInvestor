import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

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
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
