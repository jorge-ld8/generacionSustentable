import { Bar, Doughnut } from "react-chartjs-2";
import { BLUE, ORANGE, YELLOW, VIOLET, actionTypes, GREEN} from "../lib/constants";
import ProgressBar from "@ramonak/react-progress-bar";


export default function GenChartZone({name, iniNum, total, totalActionTypes, totalGenders, setFilter}){
  let options = {
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
                console.log(ctx);
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
    return (
            <div style={{padding: "0 60px"}}>
                <h2>Apuestas Formativas</h2>
                <h3>Organización: {name}</h3>
                <br />
                <select 
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    onChange={(e) => setFilter(e.target.value)}>
                    <option value="Todos">Todos</option>
                    <option value="Beneficiarios directos">Beneficiarios directos</option>
                    <option value="Beneficiarios indirectos">Beneficiarios indirectos</option>
                </select>
                <br />
                <br />
                <div>
                    <h3>Resumen {name}</h3>
                    <p>
                        Número de iniciativas: {iniNum}
                    </p>
                    <br />
                    <h4>Resumen general</h4>
                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                    <div className="chart-container">
                        <Bar datasetIdKey='id' data={{
                            labels: actionTypes,
                            datasets:[{
                                // id: 1,
                                label: 'pob LGBTIQ',
                                backgroundColor: ORANGE,
                                data: total.totalLGBT,
                                }]
                            }} style={{display:"inline-block"}} options={{ maintainAspectRatio: true }}/>
                    </div>
                    <div className="chart-container">
                        <Bar datasetIdKey='id' data={{
                        labels: actionTypes,
                        datasets:[{
                            // id: 2,
                            label: 'mujeres',
                            backgroundColor: BLUE,
                            data: total.totalMujeres,
                            }]
                        }} style={{display:"inline-block"}}  options={{ maintainAspectRatio: true }}/>
                    </div>
                    <div className="chart-container">
                        <Bar datasetIdKey='id' data={{
                        labels: actionTypes,
                        datasets:[{
                            // id: 3,
                            label: 'pob indigena',
                            backgroundColor: GREEN,
                            data: total.totalInd,
                            }]
                        }} style={{display:"inline-block"}}  options={{ maintainAspectRatio: true }}/>
                    </div>
                    <div className="chart-container">
                        <Bar datasetIdKey='id' data={{
                        labels: actionTypes,
                        datasets:[{
                            // id: 4,
                            label: 'participantes',
                            backgroundColor: VIOLET,
                            data: total.totalParticipantes,
                            }]
                        }} style={{display:"inline-block"}}  options={{ maintainAspectRatio: true }}/>
                    </div>
                    <div className="chart-container">
                        <Bar datasetIdKey='id' data={{
                        labels: actionTypes,
                        datasets:[{
                            // id: 5,
                            label: 'pob rural',
                            backgroundColor: YELLOW,
                            data: total.totalRural,
                            }]
                        }} style={{display:"inline-block"}}  options={{ maintainAspectRatio: true }}/>
                    </div>
                    <div className="chart-container">
                    <Doughnut data={{labels:actionTypes, datasets: [{
                      // id: 1,
                      label: '# iniciativas',
                      backgroundColor: [ORANGE, BLUE, GREEN, VIOLET],
                      data: totalActionTypes,
                    }]}} />
                    </div>
                    <div className="chart-container">
                    <Doughnut data={{labels:["mujeres", "hombres", "NB", "NI"], datasets: [{
                            // id: 1,
                            label: '# participantes',
                            backgroundColor: [VIOLET, BLUE, ORANGE, GREEN],
                            data: totalGenders,
                    }]}} options={options} />
                    </div>
            </div>
                    <br />
                    <h4>Comparación General</h4>
                    <br />
                    <Bar datasetIdKey='id' data={{
                    labels: ['A1', 'A2', 'A3', 'A4'],
                    datasets:[{
                      // id: 1,
                      label: 'pob. LGBTIQ',
                      backgroundColor: ORANGE,
                      data: total.totalLGBT,
                    },
                    {
                      // id: 2,
                      label: 'mujeres',
                      backgroundColor: BLUE,
                      data: total.totalMujeres,
                    },
                    {
                      // id: 3,
                      label: 'pob. indígena',
                      backgroundColor: GREEN,
                      data: total.totalInd,
                    },
                    {
                      // id: 4,
                      label: 'pob. rural',
                      backgroundColor: VIOLET,
                      data: total.totalRural,
                    },
                    {
                      // id: 5,
                      label: 'participantes',
                      backgroundColor: YELLOW,
                      data: total.totalParticipantes,
                    }
                ]
              }} style={{display:"inline-block"}} />
        </div>
        </div>
    );
}