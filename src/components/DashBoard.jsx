import "../style/DashBoard.css";
import { BarChart, Bar, ComposedChart, LineChart, Line, XAxis, YAxis, Legend, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function DashBoard(){

    const dataDetalles = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 }
      ];
      const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];


      const dataIncompletas = [
        {
          "name": "Page A",
          "uv": 2000,
          "fill":"#ff0000"
        },
        {
          "name": "Page B",
          "uv": 800,
          "fill":"#ff0000"
        },
        {
          "name": "Page C",
          "uv": 1500,
          "fill":"#ff0000"
        },
        {
          "name": "Page D",
          "uv": 2780,
          "fill":"#ff0000"
        },
        {
          "name": "Page E",
          "uv": 1890,
          "fill":"#ff0000"
        },
        {
          "name": "Page F",
          "uv": 900,
          "fill":"#ff0000"
        },
        {
          "name": "Page G",
          "uv": 3290,
          "fill":"#ff0000"
        }
      ]



      const dataCompletas = [
        {
          "name": "Page A",
          "uv": 1000,
          "fill":"#07c04e"
        },
        {
          "name": "Page B",
          "uv": 2000,
          "fill":"#07c04e"
        },
        {
          "name": "Page C",
          "uv": 2000,
          "fill":"#07c04e"
        },
        {
          "name": "Page D",
          "uv": 2780,
          "fill":"#07c04e"
        },
        {
          "name": "Page E",
          "uv": 1890,
          "fill":"#07c04e"
        },
        {
          "name": "Page F",
          "uv": 2390,
          "fill":"#07c04e"
        },
        {
          "name": "Page G",
          "uv": 3490,
          "fill":"#07c04e"
        }
      ]
      

      
      const dataMensuales = [
        {
          "name": "Page A",
          "uv": 1000,
          "fill":"#ffa500"
        },
        {
          "name": "Page B",
          "uv": 200,
          "fill":"#ffa500"
        },
        {
          "name": "Page C",
          "uv": 1100,
          "fill":"#ffa500"
        },
        {
          "name": "Page D",
          "uv": 780,
          "fill":"#ffa500"
        },
        {
          "name": "Page E",
          "uv": 1890,
          "fill":"#ffa500"
        },
        {
          "name": "Page F",
          "uv": 890,
          "fill":"#ffa500"
        },
        {
          "name": "Page G",
          "uv": 2990,
          "fill":"#ffa500"
        }
      ]

      



      const dataVS = [
        {
          "name": "Page A",
          "Tareas Completadas": 4000,
          "Tareas Incompletas": 2400,
          "amt": 2400
        },
        {
          "name": "Page B",
          "Tareas Completadas": 3000,
          "Tareas Incompletas": 1398,
          "amt": 2210
        },
        {
          "name": "Page C",
          "Tareas Completadas": 2000,
          "Tareas Incompletas": 9800,
          "amt": 2290
        },
        {
          "name": "Page D",
          "Tareas Completadas": 2780,
          "Tareas Incompletas": 3908,
          "amt": 2000
        },
        {
          "name": "Page E",
          "Tareas Completadas": 1890,
          "Tareas Incompletas": 4800,
          "amt": 2181
        },
        {
          "name": "Page F",
          "Tareas Completadas": 2390,
          "Tareas Incompletas": 3800,
          "amt": 2500
        },
        {
          "name": "Page G",
          "Tareas Completadas": 3490,
          "Tareas Incompletas": 4300,
          "amt": 2100
        }
      ]
      


      const data = [
        {
          name: 'Page A',
          uv: 590,
          amt: 1400,
        },
        {
          name: 'Page B',
          uv: 868,
          amt: 1506,
        },
        {
          name: 'Page C',
          uv: 1397,
          amt: 989,
        },
        {
          name: 'Page D',
          uv: 1480,
          amt: 1228,
        },
        {
          name: 'Page E',
          uv: 1520,
          amt: 1100,
        },
        {
          name: 'Page F',
          uv: 1400,
          amt: 1700,
        },
      ];

    return (
        <div className='dashBoard'>

            <div>
                <div className='ItemContaienr'>
                  <div className='ItemContainer1'>
                    <div className="subitemContainer">
                        <p className="taskProgress">Tareas Incompletas</p>
                        <p className="taskCounter">12</p>
                        <p className="currentmonth1">Mes Actual</p>
                    </div>
                    <div className="barchartContainer">
                    <BarChart width={165} height={115} data={dataIncompletas}>
                    <CartesianGrid strokeDasharray="3 3" />
                   {/* <XAxis dataKey="name" />  */}
                   {/* <YAxis />  */}
                    <Tooltip />
                   {/* <Legend />  */}
                   {/* <Bar dataKey="pv" fill="#8884d8" />  */}
                    <Bar dataKey="uv" fill="fill" />
                    </BarChart>
                    </div>
                  </div>
                  <div className='ItemContainer1'>
                  <div className="subitemContainer">
                        <p className="taskProgress">Tareas Completadas</p>
                        <p className="taskCounter1">104</p>
                        <p className="currentmonth1">Mes Actual</p>
                    </div>
                    <div className="barchartContainer">
                    <BarChart width={165} height={115} data={dataCompletas}>
                    <CartesianGrid strokeDasharray="3 3" />
                   {/* <XAxis dataKey="name" />  */}
                   {/* <YAxis />  */}
                    <Tooltip />
                   {/* <Legend />  */}
                   {/* <Bar dataKey="pv" fill="#8884d8" />  */}
                    <Bar dataKey="uv" fill="fill" />
                    </BarChart>
                    </div>
                  </div>
                  <div className='ItemContainer1'>
                  <div className="subitemContainer">
                        <p className="taskProgress">Tareas Mensuales</p>
                        <p className="taskCounter2">116</p>
                        <p className="currentmonth1">Mes Actual</p>
                    </div>
                    <div className="barchartContainer">
                    <BarChart width={165} height={115} data={dataMensuales}>
                    <CartesianGrid strokeDasharray="3 3" />
                   {/* <XAxis dataKey="name" />  */}
                   {/* <YAxis />  */}
                    <Tooltip />
                   {/* <Legend />  */}
                   {/* <Bar dataKey="pv" fill="#8884d8" />  */}
                    <Bar dataKey="uv" fill="fill" />
                    </BarChart>
                    </div>
                  </div>

                </div>
                
                <div className="MiddleTask">
                    <p className="TaskVS">Tareas incompletas vs Tareas Completas</p>

                    <LineChart width={955} height={210} data={dataVS}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Tareas Incompletas" stroke="#ff0000" />
                    <Line type="monotone" dataKey="Tareas Completadas" stroke="#00521f" />
                    </LineChart>
                </div>
                <div className="TaskContainer">
                    <div className="TaskChart">
                        <p className="taskContainerText">Rendimiento</p>
                        <PieChart width={270} height={270}>
                        <Pie
                            data={dataDetalles}
                            cx={138}
                            cy={110}
                            startAngle={180}
                            endAngle={0}
                            innerRadius={55}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        </PieChart>
                        <button className="ViewDetails">Ver Detalles</button>
                    </div>
                    <div className="MonthlyEarning">
                        <p className="taskContainerText">Tareas en Proceso</p>
                        <ComposedChart
                        width={630}
                        height={260}
                        data={data}
                        margin={{
                            top: 30,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                        >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" scale="band" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="uv" barSize={20} fill="#413ea0" />
                        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                        </ComposedChart>
                    </div>
                </div>
            </div>
        </div>
        
    );
    
}



