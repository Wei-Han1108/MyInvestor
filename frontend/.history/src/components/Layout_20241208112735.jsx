import Header from './Header';
import Sidebar from './Sidebar';
import MyFooter from './MyFooter';

const Layout = ({ children }) => {
  return (


    <div class="flex flex-col h-screen">
        <Header />
            <div class="flex flex-1">
                <Sidebar />
                <main class="flex-1 p-4">
                    {children}
                </main>
            </div>
        <MyFooter />
    </div>
  
  );
};

export default Layout;
