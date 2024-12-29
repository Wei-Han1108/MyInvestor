import { Sidebar } from "flowbite-react";
import { HiArrowSmLeft, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

const MySidebar = () => {
  return (
    <Sidebar aria-label="Default sidebar example" className="w-60">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            <Link to={`/`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"/>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Recommend
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            User
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmLeft}>
            Log out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default MySidebar