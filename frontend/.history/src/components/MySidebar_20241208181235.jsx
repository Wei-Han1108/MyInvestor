import { Sidebar } from "flowbite-react";
import { HiArrowSmLeft, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

const MySidebar = () => {
  return (
    <Sidebar aria-label="Default sidebar example" className="w-60">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark">
            Market
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox} label="3">
            Portfolio
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