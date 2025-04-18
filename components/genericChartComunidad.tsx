import { Bar, Doughnut } from "react-chartjs-2";
import { BLUE, GREEN, LIGHTBLUE, LIGHTVIOLET, ORANGE, ULTRALIGHTBLUE, ULTRALIGHTVIOLET, VIOLET, YELLOW, actionTypes, localidades, tipoComunidad, organizaciones} from "../lib/constants";
import ProgressBar from "@ramonak/react-progress-bar";
import ChartNav from "./ChartNav";

export default function GenChartComunidad({name, iniNum, totals, labels, color, totalLocTypes, totalComunidad, finalArr, totalGenders, totalPobs, setFilter, isSubmitting, organizations = organizaciones, currentFilter = 'Todos'}){
    const options = {
        tooltips: {
            enabled: false,
            callbacks: {
              label: function(tooltipItem, data) {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const total = dataset.data.reduce((a, b) => a + b, 0);
                const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                const percentage = Math.floor((value / total) * 100);
        
                return `${dataset.label}: ${percentage}%`;
              }
            }
        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    const datapoints = ctx.chart.data.datasets[0].data
                    const total = datapoints.reduce((total, datapoint) => total + datapoint, 0)
                    const percentage = value / total * 100
                    if (percentage < 5){
                      return percentage > 0 ?  " "+percentage.toFixed(0)+"%" : null;
                    }
                    return percentage > 0 ? percentage.toFixed(1) + "%" : null;
                },
                color: '#fff',
                backgroundColor: "#000",
            }
        }
      }; 
      
        let sumP = 0;
        finalArr["participantes"].forEach( num => {
            sumP += num;
        })

        let sum16_29 = 0;        // calculate sum using forEach() method
        finalArr["pob_16_29"].forEach( num => {
            sum16_29 += num;
        });

    return (
        <div style={{padding: "0 60px"}}>
            <h2>Apuestas Formativas</h2>
            <ChartNav items={tipoComunidad} basePath="/charts/comunidad" />
            <h3>Comunidad: {name}</h3>
            <br />
            <select 
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                onChange={(e) => setFilter(e.target.value)}
                value={currentFilter}>
                <option value="Todos">Todas las organizaciones</option>
                {organizations.map((org, index) => (
                  <option key={index} value={org}>{org}</option>
                ))}
            </select>
            <br />
            <br />
            {isSubmitting ? (
                <>
                <p>Cargando...</p>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
                <div style={{ 
                    width: '250px', 
                height: '4px', 
                backgroundColor: '#e2e8f0', 
                borderRadius: '9999px', 
                overflow: 'hidden',
                position: 'relative'
            }}>
            <div 
                style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%', 
                    width: '30%', 
                    backgroundColor: '#3b82f6', 
                    borderRadius: '9999px',
                    animation: 'loading 1.5s infinite ease-in-out'
                    }} 
                    />
                </div>
                </div>
                </>
            ) : (
                <>
                    <br />
                    <p>
                        Número de iniciativas: {iniNum}
                    </p>
                    <br />
                    <h4>
                        Número de jóvenes 16-29 años
                    </h4>
                    <br />
                    <ProgressBar 
                        completed= {`${sum16_29}`}
                        bgColor="#a7cb45"
                        labelAlignment="center"
                        labelColor="#ffffff"
                        labelSize="16px"
                        maxCompleted={sumP}
                    />
                    <br />
                    <h4>
                        Número de Participantes Totales
                    </h4>
                    <br />
                    <ProgressBar 
                        completed= {`${sumP}`}
                        bgColor="#F6BF00"
                        labelAlignment="center"
                        labelColor="#ffffff"
                        labelSize="16px"
                        maxCompleted={sumP}
                    />
                    <br />
                    <br />
                    <div style={{margin:"auto"}}>
                    <h3>Resumen General por tipo de actividad</h3>
                        <div>
                            <Bar datasetIdKey='id' data={{
                            labels: labels,
                            datasets:[
                                {
                                // id: 3,
                                label: 'Indígena',
                                backgroundColor: ULTRALIGHTBLUE,
                                data: finalArr["indigena"],
                                },
                                {
                                // id: 4,
                                label: 'Rural',
                                backgroundColor: LIGHTBLUE,
                                data: finalArr["rural"],
                                },
                                {
                                label: 'Urbana',
                                backgroundColor: BLUE,
                                data: finalArr["participantes"].map((x, index)=>{return x-finalArr["rural"][index]-finalArr["indigena"][index]})
                                },
                                {
                                // id: 1,
                                label: 'LGBTIQ',
                                backgroundColor: ULTRALIGHTVIOLET,
                                data: finalArr["lgbtiq"],
                                },
                                {
                                // id: 2,
                                label: 'Mujeres',
                                backgroundColor: LIGHTVIOLET,
                                data: finalArr["mujeres"],
                                },
                                {
                                // id: 2
                                label: 'Hombres',
                                backgroundColor: VIOLET,
                                data: finalArr["participantes"].map((x, index)=>{return x-finalArr["mujeres"][index]-finalArr["noid"][index]-finalArr["lgbtiq"][index]}),
                                },
                                {
                                // id: 5,
                                label: 'Participantes',
                                backgroundColor: YELLOW,
                                data: finalArr["participantes"],
                                }
                            ]
                            }} style={{display:"inline-block"}} />
                        </div>
                        
                        <div style={{margin: "40px 0"}}></div>
                        
                        <h3>Iniciativas por tipo de acción</h3>
                        <div className="chart-container">
                            <Bar datasetIdKey='id' data={{
                                labels: labels,
                                datasets:[{
                                    // id: 1,
                                    label: '# iniciativas',
                                    backgroundColor: color,
                                    data: totals,
                                    }]
                                }} style={{display:"inline-block"}} options={{ maintainAspectRatio: true }}/>
                        </div>
                        
                        <div style={{margin: "40px 0"}}></div>
                        
                        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                        <div className="chart-container" style={{width:"45%", display:"inline-block"}} >
                        <h4>Resumen por localidad</h4>
                        <Doughnut data={{labels:localidades, datasets: [{
                                // id: 1,
                                label: '# iniciativas',
                                backgroundColor: [ORANGE, BLUE, GREEN],
                                data: totalLocTypes
                                }]}} style={{display:"inline-block"}}/>
                        </div>
                        <div className="chart-container" style={{width:"45%", display:"inline-block"}}>
                        <h4>Resumen por acción</h4>
                        <Doughnut data={{labels:actionTypes, datasets: [{
                                // id: 1,
                                label: '# iniciativas',
                                backgroundColor: [VIOLET, BLUE, YELLOW],
                                data: totalComunidad
                                }]}} style={{display:"inline-block"}}/>
                        </div>
                        </div>
                        
                        <div style={{margin: "40px 0"}}></div>
                        
                        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                        <div className="chart-container" style={{width:"48%", display:"inline-block"}}>
                            <h4>Resumen por género</h4>
                            <Doughnut data={{labels:["mujeres", "hombres", "LGBTIQ+", "NI"], datasets: [{
                                    // id: 1,
                                    label: '# participantes',
                                    backgroundColor: [VIOLET, BLUE, GREEN, ORANGE],
                                    data: totalGenders,
                            }]}} options={options} />
                        </div>
                        <div className="chart-container" style={{width:"48%", display:"inline-block"}}>
                            <h4>Resumen por tipo de población</h4>
                            <Doughnut data={{labels:["urbana", "indígena", "rural"], datasets: [{
                                    // id: 1,
                                    label: '# participantes',
                                    backgroundColor: [BLUE, ORANGE, GREEN],
                                    data: totalPobs,
                            }]}} options={options} />
                        </div>
                        </div>
                        </div>
                </>
            )}
            <style jsx>{`
                @keyframes loading {
                    0% { left: -30%; }
                    100% { left: 100%; }
                }
            
                select {
                  padding: 8px 16px;
                  border-radius: 8px;
                  border: 1px solid #ccc;
                  font-size: 16px;
                  background-color: white;
                  cursor: pointer;
                  min-width: 200px;
                }

                select:hover {
                  border-color: #666;
                }

                select:focus {
                  outline: none;
                  border-color: #a7cb45;
                  box-shadow: 0 0 0 2px rgba(167, 203, 69, 0.2);
                }
                
                .chart-container {
                  margin-bottom: 30px;
                }
            `}</style>
        </div>
    );
}