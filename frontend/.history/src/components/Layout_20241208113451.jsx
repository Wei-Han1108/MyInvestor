import Header from './Header';
import Sidebar from './Sidebar';
import MyFooter from './MyFooter';

const Layout = ({ children }) => {
  return (
  <div className="flex flex-col h-screen">
  <Header />
  <div className="flex flex-1">
    <Sidebar className="h-full" /> 
    <main className="flex-1 p-4">
      {children}
    </main>
  </div>
  <MyFooter />
</div>);
};

export default Layout;
