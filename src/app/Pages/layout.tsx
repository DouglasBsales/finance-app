import { ReactNode } from "react";
import Menu from "@/components/MenuGlobal/Menu";

interface LayoutWithMenuProps {
  children: ReactNode;
}

const LayoutWithMenu: React.FC<LayoutWithMenuProps> = ({ children }) => {
  return (
    <div>
      {children}
      <Menu />
    </div>
  );
};

export default LayoutWithMenu;
