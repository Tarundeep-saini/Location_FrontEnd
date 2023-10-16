import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  const activeStyle = {
    borderBottom: "2px solid white",
  };

  return (
    <nav className="flex gap-8 mr-9 ">
      <NavLink className="text-lg text-white font-medium" exact="true" to="/">
        All Users
      </NavLink>
      {auth.isLoggedIn && (
        <NavLink
          className="text-lg text-white font-medium"
          exact="true"
          to={`/${auth.userId}/places`}
        >
          My Places
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <NavLink
          className="text-lg text-white font-medium"
          exact="true"
          to="/addplace"
        >
          Add New Place
        </NavLink>
      )}

      {!auth.isLoggedIn && (
        <NavLink
          className="text-lg text-white font-medium"
          exact="true"
          to="/auth"
          // activeStyle={activeStyle}
        >
          Authenticate
        </NavLink>
      )}
      {auth.isLoggedIn && (
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={auth.logout}
        >
          LOGOUT
        </button>
      )}
    </nav>
  );
};

export default NavLinks;
