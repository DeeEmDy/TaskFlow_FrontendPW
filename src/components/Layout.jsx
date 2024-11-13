import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import SidebarRight from "./SidebarRight";
import "../style/Layout.css";
import { Outlet } from 'react-router-dom'; // Importar Outlet
import PropTypes from 'prop-types';

console.log("Hola desde el Layout");
function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="content-layout">
          {children || <Outlet />} {/* Renderiza children o Outlet */}
        </div>
      </div>
      <SidebarRight />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;