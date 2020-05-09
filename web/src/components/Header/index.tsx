import React from "react";
import { NavLink } from "react-router-dom";

const headerLinks = [
  {
    path: "/",
    label: "Home",
  },
];

export const Header: React.FC = () => {
  return (
    <div>
      <ul>
        {headerLinks.map((link) => (
          <NavLink key={link.label} to={link.path}>
            {link.label}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};
