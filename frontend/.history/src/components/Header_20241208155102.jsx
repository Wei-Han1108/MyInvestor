import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} to="/">
        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-20 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/Storage">Storage</Navbar.Link>
        <Navbar.Link as={Link} to="/login">Sign In</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;