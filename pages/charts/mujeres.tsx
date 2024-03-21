import { GetStaticProps } from "next";
import {Chart } from 'chart.js/auto';
import Reportsnav from "../../components/reportsnav";
import {CategoryScale} from 'chart.js';
import prisma from "../../lib/prisma";
import { Bar } from "react-chartjs-2";
import { BLUE, actionTypes } from "../../lib/constants";


function normalizeResults(inputArr){
    let finalArr = new Array(4).fill(0);
    //hacerlo para el array inicial
    for(const elem of inputArr){
        let arrType = elem["type"]; /* A1, A2, A3 o A4 */
        let sumElem =  elem["_sum"]["nro_mujeres"];
        finalArr[+arrType[1] - 1] = sumElem;
    }
    return finalArr;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
     // Calculando numero de poblacion rural
    const totalMujeres = await prisma.actionA1.groupBy(
        {
            by:['type'],
            _sum:{
                nro_mujeres: true,
            }
        }
    )
    return {
        props:{
            // totalLGBT: JSON.parse(JSON.stringify(totalLGBT)),
            totalMujeres: normalizeResults(totalMujeres),
        },
        revalidate: 10,
    }
  }

export default function ChartFinal(props){
    Chart.register(CategoryScale);
    return (
        <div>
            <Reportsnav/>
            <Bar datasetIdKey='id' data={{
              labels: actionTypes,
              datasets:[{
                //   id: 2,
                  label: 'nro de mujeres',
                  backgroundColor: BLUE,
                  data: props.totalMujeres,
                }]
          }} style={{display:"inline-block"}} />
        </div>
    );
}