import React from "react";

interface navbarItemProps {
  label: string;
  link: string;
}

const NavbarItem: React.FC<navbarItemProps> = ({ label }) => {
  return <div className="text-white cursor-pointer hover:text-gray-300 transition">{label}</div>;
};

export default NavbarItem;
