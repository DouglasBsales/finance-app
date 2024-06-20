import { ReactNode } from "react";
import Menu from "@/components/MenuGlobal/Menu";

interface LayoutWithMenuProps {
  children: ReactNode;
}

const LayoutWithMenu: React.FC<LayoutWithMenuProps> = ({ children }) => {
  return (
    <div>
      <div className="w-full  overflow-y-auto flex justify-center bg-whitePrimary ">
        {children}
        <Menu />
      </div>
    </div>
  );
};

export default LayoutWithMenu;
