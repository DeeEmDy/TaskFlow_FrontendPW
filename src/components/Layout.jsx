import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import SidebarRight from "./SidebarRight";
import "../style/Layout.css";
import { Outlet } from 'react-router-dom'; // Importar Outlet
import PropTypes from 'prop-types';

console.log("Hola desde el Layout");

function Layout({ children }) {
  return (
    <div className="layout flex flex-col h-screen"> {/* Añadido h-screen para que ocupe todo el alto de la pantalla */}
      <div className="flex flex-1"> {/* Agregado flex-1 para que el contenido ocupe el espacio restante */}
        <Sidebar />
        <div className="main-content flex flex-col w-full"> {/* Se añadió flex-col para disposición vertical */}
          <TopBar />
          <div className="content-layout flex-1"> {/* Flex-1 para que ocupe el espacio disponible */}
            {children || <Outlet />} {/* Renderiza children o Outlet */}
          </div>
        </div>
        <SidebarRight />
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
