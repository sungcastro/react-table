import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <NavLink className="nav-link" to="/movies">
            Movies
          </NavLink>

          <NavLink className="nav-link" to="/Customers">
            Customers
          </NavLink>

          <NavLink className="nav-link" to="/rentals">
            Rentals
          </NavLink>

          {!user && (
            <React.Fragment>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>

              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </React.Fragment>
          )}

          {user && (
            <React.Fragment>
              <NavLink className="nav-link" to="/profile">
                {user.name}
              </NavLink>

              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
