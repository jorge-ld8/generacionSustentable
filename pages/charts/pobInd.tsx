import { GetStaticProps } from "next";
import {Chart } from 'chart.js/auto';
import Reportsnav from "../../components/reportsnav";
import {CategoryScale} from 'chart.js';
import prisma from "../../lib/prisma";
import { Bar } from "react-chartjs-2";
import { GREEN, actionTypes } from "../../lib/constants";


function normalizeResults(inputArr){
    const finalArr = new Array(4).fill(0);
    //hacerlo para el array inicial
    for(const elem of inputArr){
        const arrType = elem["type"]; /* A1, A2, A3 o A4 */
        const sumElem =  elem["_sum"]["nro_pob_ind"];
        finalArr[+arrType[1] - 1] = sumElem;
    }
    return finalArr;
}

export const getStaticProps: GetStaticProps = async () => {
     // Calculando numero de poblacion rural
    const totalP = await prisma.actionA1.groupBy(
        {
            by:['type'],
            _sum:{
                nro_pob_ind: true,
            }
        }
    )
    return {
        props:{
            totalP: normalizeResults(totalP),
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
                  label: 'nro poblacion indigena ',
                  backgroundColor: GREEN,
                  data: props.totalP,
                }]
          }} style={{display:"inline-block"}} />
        </div>
    );
}