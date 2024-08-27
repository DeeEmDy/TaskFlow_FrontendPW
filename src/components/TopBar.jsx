import '../style/TopBar.css'

function HomePage() {
  return (
    <div className="homepage-container">
      {/* Barra de navegación */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">Task Flow</div>
          <ul className="navbar-links">
            <li><a href="/homePage">Inicio</a></li>
            <li><a href="#">Sobre Nosotros</a></li>
            <li><a href="#">Servicios</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
      </nav>

    </div>
  );
}

export default HomePage;
