import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import SidebarRight from "./SidebarRight";
import { Outlet } from "react-router-dom"; // Importamos Outlet de react-router-dom
import "../style/Layout.css";

function Layout() {
  return (
    <div className="layout">
      {/* Sidebar izquierdo */}
      <Sidebar />

      <div className="main-content">
        {/* TopBar */}
        <TopBar />

        <div className="content-layout">
          {/* Contenido principal, donde se renderizan las rutas hijas */}
          <Outlet />
        </div>
      </div>

      {/* Sidebar derecho */}
      <SidebarRight />
    </div>
  );
}

export default Layout;
