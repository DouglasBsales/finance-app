import { ReactNode } from "react";
import Menu from "@/components/MenuGlobal/Menu";
import { HeaderGlobal } from "@/components/MenuGlobal/HeaderGlobal";

interface LayoutWithMenuProps {
  children: ReactNode;
}

const LayoutWithMenu: React.FC<LayoutWithMenuProps> = ({ children }) => {
  return (
    <div>
      <HeaderGlobal/>
      {children}
      <Menu />
    </div>
  );
};

export default LayoutWithMenu;
