

import { NavLink } from 'react-router-dom'

const Header = ({ isDarkMode, onToggleDarkMode, user }) => {
  const buttonTextContent = isDarkMode ? "Light Mode" : "Dark Mode";
//
  return (
    <header id="header">

      <nav>
        <div id="STORENAME">
        Ride Revolution 
        </div>

        <div id="navigation">

          <div id="sep">
          </div>
   
          <div id="headButtons" >
          <div id="contheadButtons" >
          <NavLink className="headnavbutton" exact to="/MotorcycleUpgrades">
              Upgrades
          </NavLink>

          <NavLink className="headnavbutton" exact to="/RidingGear">
          Riding Gear
          </NavLink>

          <NavLink className="headnavbutton" exact to="/about">
              About & Contact
          </NavLink>


          {Object.keys(user).length === 0 && (
          <NavLink className="headnavbutton" exact to="/login">
              Login
          </NavLink>
          )}
          </div>
          </div>

          <div id="headIcons">
          {user.id >= 1 && (
          <NavLink 
          className="button-icon-user" exact to="/orders">
          </NavLink>
          )}

          {user.id >= 1 && (
          <NavLink
          className="button-icon-cart" exact to="/cart">     
          </NavLink>
          )}
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Header;