import { Sidebar } from "flowbite-react";
import { HiArrowSmLeft, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { Link } from "react-router-dom";
const MySidebar = () => {
  return (
    <Sidebar aria-label="Default sidebar example" className="w-60">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiChartPie}>
            <Link to={`/`}>Dashboard</Link>
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