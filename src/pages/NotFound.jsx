import React from 'react'; //eslint-disable-line

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>La página que estás buscando no existe.</p>
      <a href="/">Volver a la página principal</a>
    </div>
  );
};

export default NotFound;