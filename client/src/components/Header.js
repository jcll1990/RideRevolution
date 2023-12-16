

import { Link, NavLink } from 'react-router-dom'

const Header = ({ isDarkMode, onToggleDarkMode }) => {
  const buttonTextContent = isDarkMode ? "Light Mode" : "Dark Mode";
//
  return (
    <header id="header">
      <nav>
        <h1 id="STORENAME"> Ride Revolution </h1>
        <br />
        <div className="navigation">
        <br />
        <NavLink className="button" exact to="/">
            Login
        </NavLink>
        <br />
        <NavLink className="button" exact to="/home">
            Home
        </NavLink>
        <br />
        <NavLink className="button" exact to="/cart">
            Cart
        </NavLink>
        <br />
        <NavLink className="button" exact to="/orders">
            Orders
        </NavLink>
        <br />
        <NavLink className="button" exact to="/about">
            About
        </NavLink>


        </div>
      </nav>
    </header>
  );
};

export default Header;