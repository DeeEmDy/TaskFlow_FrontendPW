// src/components/Layout.jsx
import Sidebar from "./Sidebar";
import "../style/Layout.css";

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default Layout;
