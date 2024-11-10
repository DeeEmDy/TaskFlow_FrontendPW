import { useState } from 'react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Lógica para enviar el correo de recuperación
    console.log('Recuperación de contraseña para: ', email);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h3>Recuperar Contraseña</h3>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Ingrese su correo electrónico aquí"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Enviar enlace de recuperación
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
