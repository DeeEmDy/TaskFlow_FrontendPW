import { useState } from "react";
import "../style/DashBoard.css";
import { BarChart, Bar, ComposedChart, LineChart, Line, XAxis, YAxis, Legend, CartesianGrid, Tooltip } from 'recharts';

export default function DashBoard() {

    const [filter, setFilter] = useState("");
    const [isFilterSelected, setIsFilterSelected] = useState(false); // Nuevo estado


    const dataIncompletas = [
        { name: "Page A", uv: 2000, fill: "#ff0000" },
        { name: "Page B", uv: 800, fill: "#ff0000" },
        { name: "Page C", uv: 1500, fill: "#ff0000" },
        { name: "Page D", uv: 2780, fill: "#ff0000" },
        { name: "Page E", uv: 1890, fill: "#ff0000" },
        { name: "Page F", uv: 900, fill: "#ff0000" },
        { name: "Page G", uv: 3290, fill: "#ff0000" }
    ];

    const dataCompletas = [
        { name: "Page A", uv: 1000, fill: "#07c04e" },
        { name: "Page B", uv: 2000, fill: "#07c04e" },
        { name: "Page C", uv: 2000, fill: "#07c04e" },
        { name: "Page D", uv: 2780, fill: "#07c04e" },
        { name: "Page E", uv: 1890, fill: "#07c04e" },
        { name: "Page F", uv: 2390, fill: "#07c04e" },
        { name: "Page G", uv: 3490, fill: "#07c04e" }
    ];

    const dataMensuales = [
        { name: "Page A", uv: 1000, fill: "#ffa500" },
        { name: "Page B", uv: 200, fill: "#ffa500" },
        { name: "Page C", uv: 1100, fill: "#ffa500" },
        { name: "Page D", uv: 780, fill: "#ffa500" },
        { name: "Page E", uv: 1890, fill: "#ffa500" },
        { name: "Page F", uv: 890, fill: "#ffa500" },
        { name: "Page G", uv: 2990, fill: "#ffa500" }
    ];

    const dataVS = [
        { name: "Page A", "Tareas Completadas": 4000, "Tareas Incompletas": 2400, amt: 2400 },
        { name: "Page B", "Tareas Completadas": 3000, "Tareas Incompletas": 1398, amt: 2210 },
        { name: "Page C", "Tareas Completadas": 2000, "Tareas Incompletas": 9800, amt: 2290 },
        { name: "Page D", "Tareas Completadas": 2780, "Tareas Incompletas": 3908, amt: 2000 },
        { name: "Page E", "Tareas Completadas": 1890, "Tareas Incompletas": 4800, amt: 2181 },
        { name: "Page F", "Tareas Completadas": 2390, "Tareas Incompletas": 3800, amt: 2500 },
        { name: "Page G", "Tareas Completadas": 3490, "Tareas Incompletas": 4300, amt: 2100 }
    ];

    const data = [
        { name: 'Page A', uv: 590, amt: 1400 },
        { name: 'Page B', uv: 868, amt: 1506 },
        { name: 'Page C', uv: 1397, amt: 989 },
        { name: 'Page D', uv: 1480, amt: 1228 },
        { name: 'Page E', uv: 1520, amt: 1100 },
        { name: 'Page F', uv: 1400, amt: 1700 }
    ];

    return (
        
        <div className="flex flex-col p-5 gap-5 mt-2">
            {/* Dropdown para filtrar */}
            <div className="flex justify-end mb-5">
                <select 
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                        setIsFilterSelected(true); // Actualiza el estado al seleccionar
                    }}
                    className="p-2 border rounded-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Selecciona una opción</option> {/* Opción inicial vacía */}
                    <option value="Tareas Completas">Tareas Completas</option>
                    <option value="Tareas Incompletas">Tareas Incompletas</option>
                    <option value="Tareas Mensuales">Tareas Mensuales</option>
                    <option value="Tareas en Progreso">Tareas en Progreso</option>
                </select>
            </div>

        {/* Sección de gráficos según filtro */}
        <div className="bg-white p-4 shadow rounded-lg mb-5 flex flex-col items-center">
            <p className="text-lg font-semibold text-center">Gráfico de {filter}</p>
            {isFilterSelected && filter === "Tareas Incompletas" && (
                <div className="flex justify-center"> {/* Contenedor flex para centrar el gráfico */}
                    <BarChart width={490} height={200} data={dataIncompletas}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="uv" fill="#ff0000" />
                    </BarChart>
                </div>
            )}
            {isFilterSelected && filter === "Tareas Completas" && (
                <div className="flex justify-center"> {/* Contenedor flex para centrar el gráfico */}
                    <BarChart width={490} height={200} data={dataCompletas}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="uv" fill="#07c04e" />
                    </BarChart>
                </div>
            )}
            {isFilterSelected && filter === "Tareas Mensuales" && (
                <div className="flex justify-center"> {/* Contenedor flex para centrar el gráfico */}
                    <BarChart width={490} height={200} data={dataMensuales}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="uv" fill="#ffa500" />
                    </BarChart>
                </div>
            )}
            {isFilterSelected && filter === "Tareas en Progreso" && (
                <div className="flex justify-center"> {/* Contenedor flex para centrar el gráfico */}
                    <BarChart width={490} height={200} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="uv" fill="#413ea0" />
                    </BarChart>
                </div>
            )}
        </div>


            {/* Sección de gráficos de tareas */}
            <div className='flex flex-wrap justify-between gap-5 mb-5'>
                {/* Gráfico de tareas incompletas */}
                <div className='flex flex-col bg-white p-5 shadow rounded-lg flex-1 max-w-xs'>
                    <div className='flex-1'>
                        <p className="text-lg font-semibold">Tareas Incompletas</p>
                        <p className="text-3xl font-bold">12</p>
                        <p className="text-sm">Mes Actual</p>
                    </div>
                    <div className='flex-1'>
                        <BarChart width={180} height={100} data={dataIncompletas}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Bar dataKey="uv" fill="#ff0000" />
                        </BarChart>
                    </div>
                </div>

                {/* Gráfico de tareas completadas */}
                <div className='flex flex-col bg-white p-5 shadow rounded-lg flex-1 max-w-xs'>
                    <div className='flex-1'>
                        <p className="text-lg font-semibold">Tareas Completadas</p>
                        <p className="text-3xl font-bold">104</p>
                        <p className="text-sm">Mes Actual</p>
                    </div>
                    <div className='flex-1'>
                        <BarChart width={180} height={100} data={dataCompletas}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Bar dataKey="uv" fill="#07c04e" />
                        </BarChart>
                    </div>
                </div>

                {/* Gráfico de tareas mensuales */}
                <div className='flex flex-col bg-white p-5 shadow rounded-lg flex-1 max-w-xs'>
                    <div className='flex-1'>
                        <p className="text-lg font-semibold">Tareas Mensuales</p>
                        <p className="text-3xl font-bold">116</p>
                        <p className="text-sm">Mes Actual</p>
                    </div>
                    <div className='flex-1'>
                        <BarChart width={180} height={100} data={dataMensuales}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Bar dataKey="uv" fill="#ffa500" />
                        </BarChart>
                    </div>
                </div>
            </div>

            {/* Gráfico de comparación */}
            <div className="bg-white p-5 shadow rounded-lg mb-5">
                <p className="text-lg font-semibold text-center">Tareas incompletas vs Tareas Completas</p>
                <LineChart width={955} height={210} data={dataVS} margin={{ top: 5, right: 80, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Tareas Incompletas" stroke="#ff0000" />
                    <Line type="monotone" dataKey="Tareas Completadas" stroke="#00521f" />
                </LineChart>
            </div>

            {/* Gráfico de tareas en proceso */}
            <div className='bg-white p-5 shadow rounded-lg'>
                <p className="text-lg font-semibold">Tareas en Proceso</p>
                <ComposedChart width={630} height={260} data={data} margin={{ top: 30, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="uv" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                </ComposedChart>
            </div>
        </div>
    );
}
