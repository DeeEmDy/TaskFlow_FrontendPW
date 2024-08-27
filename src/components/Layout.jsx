// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import "../style/Layout.css";

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <TopBar />
      <div className="contentLayout">
        {children}
      </div>
    </div>
  );
}

export default Layout;
