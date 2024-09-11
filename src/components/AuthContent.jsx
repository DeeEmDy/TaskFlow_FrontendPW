import React, { useEffect, useState } from 'react'; //eslint-disable-line
import { request } from '../axios_helper';

export default function AuthContent() {
    // Estado para almacenar los datos obtenidos del backend
    const [data, setData] = useState([]);

    // Efecto para realizar la solicitud al backend al montar el componente
    useEffect(() => {
        request("GET", "/messages", {})
            .then((response) => {
                setData(response.data);
            });
    }, []); // El arreglo vacío asegura que este efecto solo se ejecute una vez

    return (
        <div className="row justify-content-md-center">
            <div className="col-4">
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">
                            Respuesta obtenida del BackEnd
                        </h5>
                        <p className="card-text">Contenido:</p>
                        <ul>
                            {data && data.map((line) => (
                                <li key={line}>{line}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
