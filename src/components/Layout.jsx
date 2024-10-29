// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import SidebarRight from "./SidebarRight";
import "../style/Layout.css";

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <TopBar />
      <SidebarRight />
      <div className="contentLayout">
        {children}
      </div>
    </div>
  );
}

export default Layout;
