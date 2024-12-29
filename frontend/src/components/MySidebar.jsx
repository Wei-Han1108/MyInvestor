import { Sidebar } from "flowbite-react";
import { HiArrowSmLeft, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link } from "react-router-dom";
const MySidebar = () => {
  return (
    <Sidebar aria-label="Default sidebar example" className="w-60">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/recommend" icon={HiViewBoards}>
            Recommend
          </Sidebar.Item>
          <Sidebar.Item href="/login" icon={HiArrowSmLeft}>
            Log out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default MySidebar