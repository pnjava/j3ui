import { Outlet } from "react-router-dom";
import { DebugMenu } from "../components/DebugMenu";
import { Toaster } from "sonner";
import { Subheader } from "../components/header/Subheader";

const MainLayout: React.FC = () => (
  <>
    <Toaster />
    <DebugMenu />
    <div className="relative">
      <Subheader />
      <Outlet />
    </div>
    <div className="text-white text-opacity-10 text-xs absolute right-0 opacity-0  hover:opacity-100 transition-opacity duration-300 cursor-default select-none">
      {String(process.env.VITE_DAP_VESRION)}
    </div>
  </>
);

export default MainLayout;
