import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="bg-black w-48 absolute top-12 left-18 py-5 flex-col border-2 border-gray-800">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">Home</div>
      </div>
    </div>
  );
};

export default MobileMenu;
