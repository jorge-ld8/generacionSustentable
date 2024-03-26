import { Bar, Doughnut } from "react-chartjs-2";
import { BLUE, GREEN, ORANGE, VIOLET, YELLOW, actionTypes, localidades} from "../lib/constants";
import Comunidadnav from "./comunnav";

export default function GenChartComunidad({name, iniNum, totals, labels, color, totalLocTypes, totalComunidad, finalArr, totalGenders, totalPobs}){
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
        <div>
        <h3>Tipo de localidad: {name}</h3>
        <Comunidadnav/>
        <p>
            Número de iniciativas: {iniNum}
        </p>
        <br />
        <div style={{margin:"auto"}}>
        <h3>Resumen General por tipo de actividad</h3>
            <div>
                <Bar datasetIdKey='id' data={{
                labels: labels,
                datasets:[{
                    // id: 1,
                    label: 'pob. LGBTIQ',
                    backgroundColor: ORANGE,
                    data: finalArr["lgbtiq"],
                    },
                    {
                    // id: 2,
                    label: 'mujeres',
                    backgroundColor: BLUE,
                    data: finalArr["mujeres"],
                    },
                    {
                    // id: 3,
                    label: 'pob. indígena',
                    backgroundColor: GREEN,
                    data: finalArr["indigena"],
                    },
                    {
                    // id: 4,
                    label: 'pob. rural',
                    backgroundColor: VIOLET,
                    data: finalArr["rural"],
                    },
                    {
                    // id: 5,
                    label: 'participantes',
                    backgroundColor: YELLOW,
                    data: finalArr["participantes"],
                    }
                ]
                }} style={{display:"inline-block"}} />
            </div>
            <br />
            <h3>Iniciativas por tipo de accion</h3>
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
            <br />
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
            <h4>Resumen por accion</h4>
            <Doughnut data={{labels:actionTypes, datasets: [{
                    // id: 1,
                    label: '# iniciativas',
                    backgroundColor: [VIOLET, BLUE, YELLOW],
                    data: totalComunidad
                    }]}} style={{display:"inline-block"}}/>
            </div>
            <div className="chart-container" style={{width:"48%", display:"inline-block"}}>
                <h4>Resumen por genero</h4>
                <Doughnut data={{labels:["mujeres", "hombres", "NB", "NI"], datasets: [{
                        // id: 1,
                        label: '# participantes',
                        backgroundColor: [VIOLET, BLUE, ORANGE, GREEN],
                        data: totalGenders,
                }]}} options={options} />
            </div>
            <div className="chart-container" style={{width:"48%", display:"inline-block"}}>
                <h4>Resumen por tipo de poblacion</h4>
                <Doughnut data={{labels:["urbana", "indígena", "rural"], datasets: [{
                        // id: 1,
                        label: '# participantes',
                        backgroundColor: [BLUE, ORANGE, GREEN],
                        data: totalPobs,
                }]}} options={options} />
            </div>
        </div>
    </div>
    );
}