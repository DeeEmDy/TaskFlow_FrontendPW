import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import SidebarRight from "./SidebarRight";
import "../style/Layout.css";

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div className="layout">
      {/* Sidebar izquierdo */}
      <Sidebar />

      <div className="main-content">
        {/* TopBar */}
        <TopBar />

        <div className="content-layout">
          {/* Contenido principal */}
          {children}
        </div>
      </div>

      {/* Sidebar derecho */}
      <SidebarRight />
    </div>
  );
}

export default Layout;
