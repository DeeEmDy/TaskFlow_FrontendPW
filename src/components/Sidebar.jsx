import { useState, useEffect } from "react";
import "../style/Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = (e) => {
    if (!e.target.closest('.sidebar') && isOpen) {
      setIsOpen(false);
    }
  };


  useEffect(() => {
    document.addEventListener('click', closeSidebar);
    return () => {
      document.removeEventListener('click', closeSidebar);
    };
  }, [isOpen]);

  return (
    <div className={`container ${isOpen ? "sidebar-open" : ""}`}>
      <div className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="menu-btn" onClick={toggleSidebar}>
          <i className={`ph-bold ph-caret-${isOpen ? "right" : "left"}`}></i>
        </div>
        <div className="head">
        <a href="#">
          <div className="user-img">
            <img src="user.jpg" />
          </div>
          </a>
          <div className="user-details">
            <p className="title">Task Flow</p>
            <p className="name">Dixon Gongora</p>
          </div>
        </div>
        <div className="nav">
          <div className="menu">
            <p className="title">Main</p>
            <ul>
              <li>
                <a href="#">
                  <i className="icon ph-bold ph-house-simple"></i>
                  <span className="text">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/calendar">
                  <i className="icon ph-bold ph-user"></i>
                  <span className="text">Calendario</span>
                  <i className="arrow ph-bold ph-caret-down"></i>
                </a>
               
              </li>
              <li>
                <a href="#">
                  <i className="icon ph-bold ph-calendar-blank"></i>
                  <span className="text">Eventos</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="icon ph-bold ph-chart-bar"></i>
                  <span className="text">Income</span>
                  <i className="arrow ph-bold ph-caret-down"></i>
                </a>

              </li>
            </ul>
          </div>
          <div className="menu">
            <p className="title">Settings</p>
            <ul>
              <li>
                <a href="#">
                  <i className="icon ph-bold ph-gear"></i>
                  <span className="text">Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="menu">
          <p className="title">Account</p>
          <ul>
            <li>
              <a href="#">
                <i className="icon ph-bold ph-info"></i>
                <span className="text">Help</span>
              </a>
            </li>
            <li>
              <a href="/">
                <i className="icon ph-bold ph-sign-out"></i>
                <span className="text">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
