import { GetStaticProps } from "next";
import {Chart } from 'chart.js/auto';
import Reportsnav from "../../../components/reportsnav";
import {CategoryScale} from 'chart.js';
import { Bar } from "react-chartjs-2";
import prisma from "../../../lib/prisma";
import { BLUE, GREEN, LIGHTBLUE, LIGHTVIOLET, ORANGE, ULTRALIGHTBLUE, ULTRALIGHTVIOLET, VIOLET, YELLOW, actionTypes } from "../../../lib/constants";


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
                nro_pob_rural: true,
                nro_noid: true
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
                "noid": normalizeResults(totalGral, "nro_noid"),
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
              labels: actionTypes,
              datasets:[
                {
                  // id: 3,
                  label: 'Indígena',
                  backgroundColor: ULTRALIGHTBLUE,
                  data: props.finalArr["indigena"],
                },
                {
                  // id: 4,
                  label: 'Rural',
                  backgroundColor: LIGHTBLUE,
                  data: props.finalArr["rural"],
                },
                {
                  label: 'Urbana',
                  backgroundColor: BLUE,
                  data: props.finalArr["participantes"].map((x, index)=>{return x-props.finalArr["rural"][index]-props.finalArr["indigena"][index]}),
                },
                {
                  // id: 1,
                  label: 'LGBTIQ+',
                  backgroundColor: ULTRALIGHTVIOLET,
                  data: props.finalArr["lgbtiq"],
                },
                {
                  // id: 2,
                  label: 'Mujeres',
                  backgroundColor: LIGHTVIOLET,
                  data: props.finalArr["mujeres"],
                },
                {
                  // id: 1,
                  label: 'Hombres',
                  backgroundColor: VIOLET,
                  data: props.finalArr["participantes"].map((x, index)=>{return x-props.finalArr["mujeres"][index]-props.finalArr["noid"][index]-props.finalArr["lgbtiq"][index]}),
                },
                {
                  // id: 5,
                  label: 'participantes',
                  backgroundColor: YELLOW,
                  data: props.finalArr["participantes"],
                }
            ]
          }} style={{display:"inline-block"}} />
        </div>
    );
}