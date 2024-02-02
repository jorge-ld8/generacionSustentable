import { GetStaticProps } from "next";
import {Chart } from 'chart.js/auto';
import Reportsnav from "../../../components/reportsnav";
import {CategoryScale} from 'chart.js';
import { Bar } from "react-chartjs-2";
import prisma from "../../../lib/prisma";


function normalizeResults(inputArr, att){
    let finalArr = new Array(4).fill(0);
    //hacerlo para el array inicial
    for(const elem of inputArr){
        let arrType = elem["type"]; /* A1, A2, A3 o A4 */
        let sumElem =  elem["_sum"][att];
        finalArr[+arrType[1] - 1] = sumElem;
    }
    return finalArr;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
     // Calculando numero de poblacion rural
    const totalGral = await prisma.actionA1.groupBy(
        {
            by:['type'],
            _sum:{
                nro_pob_lgbtiq: true,
                nro_mujeres: true,
                nro_pob_ind: true,
                nro_participantes: true,
                nro_pob_rural: true
            }
        }
    )
    console.log(totalGral);
    return {
        props:{
            finalArr: {
                "lgbtiq": normalizeResults(totalGral, "nro_pob_lgbtiq"),
                "mujeres": normalizeResults(totalGral, "nro_mujeres"),
                "indigena": normalizeResults(totalGral, "nro_pob_ind"),
                "participantes": normalizeResults(totalGral, "nro_participantes"),
                "rural": normalizeResults(totalGral, "nro_pob_rural")
            },
        },
        revalidate: 10,
    }
  }

export default function ChartFinal(props){
    Chart.register(CategoryScale);
    console.log(props.totalGeneral);
    return (
        <div>
            <Reportsnav/>
            <Bar datasetIdKey='id' data={{
              labels: ['A1', 'A2', 'A3', 'A4'],
              datasets:[{
                  id: 1,
                  label: 'pob. LGBTIQ',
                  backgroundColor: 'rgba(240, 144, 51, 0.75)',
                  data: props.finalArr["lgbtiq"],
                },
                {
                  id: 2,
                  label: 'mujeres',
                  backgroundColor: 'rgba(16, 159, 153, 0.75)',
                  data: props.finalArr["mujeres"],
                },
                {
                  id: 3,
                  label: 'pob. indígena',
                  backgroundColor: 'rgba(167, 203, 69, 0.75)',
                  data: props.finalArr["indigena"],
                },
                {
                  id: 4,
                  label: 'pob. rural',
                  backgroundColor: 'rgba(95, 64, 145, 0.75)',
                  data: props.finalArr["rural"],
                },
                {
                  id: 5,
                  label: 'participantes',
                  backgroundColor: 'rgba(246, 191, 0, 0.75)',
                  data: props.finalArr["participantes"],
                }
            ],
            options: {
                    scales: {
                      y: {
                        title: {
                          display: true,
                          text: 'My y axis its fine '
                        }
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'My x axis its fine'
                        }
                      },
                    }     
            }
          }} style={{display:"inline-block"}} />
        </div>
    );
}