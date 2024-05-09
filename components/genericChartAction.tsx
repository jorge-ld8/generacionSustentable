import { Bar, Doughnut } from "react-chartjs-2";
import { BLUE, GREEN, LIGHTBLUE, LIGHTVIOLET, ORANGE, PINK, ULTRALIGHTBLUE, ULTRALIGHTVIOLET, VIOLET, YELLOW, localidades, tipoComunidad } from "../lib/constants";
import Typesnav from "./typesnav";
import ProgressBar from "@ramonak/react-progress-bar";
import { CleaningServices } from "@mui/icons-material";
import styles from './genericChartAction.module.css';
import { scales } from "chart.js";


export default function GenChartAction({name, iniNum, totals, labels, color, totalLocTypes, totalComunidad, finalArr, totalGenders, totalPobs}){

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

        // create a variable for the sum and initialize it
        let sumP = 0;

        // calculate sum using forEach() method
        finalArr["participantes"].forEach( num => {
            sumP += num;
        })

        // create a variable for the sum and initialize it
        let sum16_29 = 0;

        // calculate sum using forEach() method
        finalArr["pob_16_29"].forEach( num => {
            sum16_29 += num;
        });

    return (
        <div>
        <h3>Tipo de acción: {name}</h3>
        <Typesnav/>
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
        <br />
        <div style={{margin:"auto"}}>
            <h4>Resumen General por tipo de actividad</h4>
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
                    data: finalArr["participantes"].map((x, index)=>{return x-finalArr["rural"][index]-finalArr["indigena"][index]}),
                    },
                    {
                    // id: ,
                    label: 'LGBTIQ',
                    backgroundColor: ULTRALIGHTVIOLET,
                    data: finalArr["lgbtiq"],
                    },
                    {
                    // id: 5,
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
                    // id: 6,
                    label: 'Participantes',
                    backgroundColor: YELLOW,
                    data: finalArr["participantes"],
                    }
                ]
                }} style={{display:"inline-block"}} />
            </div>
            <br />
            <br />
            <h4>Iniciativas por tipo de actividad</h4>
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
            <br />
            <div className="chart-container" style={{width:"45%", display:"inline-block"}} >
            <h4>Resumen por localidad</h4>
            <Doughnut data={{labels:localidades, datasets: [{
                    // id: 1,
                    label: '# iniciativas',
                    backgroundColor: [ORANGE, BLUE, GREEN, VIOLET],
                    data: totalLocTypes
                    }]}} style={{display:"inline-block"}}/>
            </div>
            <div className="chart-container" style={{width:"45%", display:"inline-block"}}>
            <h4>Resumen por comunidad</h4>
            <Doughnut data={{labels:tipoComunidad, datasets: [{
                    // id: 1,
                    label: '# iniciativas',
                    backgroundColor: [ORANGE, BLUE, YELLOW, GREEN],
                    data: totalComunidad
                    }]}} style={{display:"inline-block"}}/>
            </div>
            <br />
            <br />
            <br />
            <div className="chart-container" style={{width:"48%", display:"inline-block"}}>
                <h4>Resumen por género</h4>
                <Doughnut data={{labels:["mujeres", "hombres", "LGBTIQ+" ,"NI"], datasets: [{
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
    );
}