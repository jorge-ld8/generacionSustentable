import { Bar, Doughnut } from "react-chartjs-2";
import { BLUE, ORANGE, YELLOW, VIOLET, actionTypes, GREEN } from "../lib/constants";
import Zonasnav from "./zonasnav";


export default function GenChartZone({name, iniNum, total, totalActionTypes}){
    return (
            <div>
                <h2>Apuestas Formativas</h2>
                <Zonasnav/>
                <h3>Localidad: {name}</h3>
                <br />
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
                            id: 1,
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
                        id: 2,
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
                        id: 3,
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
                        id: 4,
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
                        id: 5,
                        label: 'pob rural',
                        backgroundColor: YELLOW,
                        data: total.totalRural,
                      }]}} style={{display:"inline-block"}}  options={{ maintainAspectRatio: true }}/>
                </div>
                <div className="chart-container">
                <Doughnut data={{labels:actionTypes, datasets: [{
                        id: 1,
                        label: '# iniciativas',
                        backgroundColor: [ORANGE, BLUE, GREEN, VIOLET],
                        data: totalActionTypes,
                }]}} />
                </div>
        </div>
                <br />
                <h4>Comparación General</h4>
                <br />
                <Bar datasetIdKey='id' data={{
                labels: ['A1', 'A2', 'A3', 'A4'],
                datasets:[{
                  id: 1,
                  label: 'pob. LGBTIQ',
                  backgroundColor: ORANGE,
                  data: total.totalLGBT,
                },
                {
                  id: 2,
                  label: 'mujeres',
                  backgroundColor: BLUE,
                  data: total.totalMujeres,
                },
                {
                  id: 3,
                  label: 'pob. indígena',
                  backgroundColor: GREEN,
                  data: total.totalInd,
                },
                {
                  id: 4,
                  label: 'pob. rural',
                  backgroundColor: VIOLET,
                  data: total.totalRural,
                },
                {
                  id: 5,
                  label: 'participantes',
                  backgroundColor: YELLOW,
                  data: total.totalParticipantes,
                }
            ]
          }} style={{display:"inline-block"}} />
    </div>
    );
}