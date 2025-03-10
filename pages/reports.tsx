import styles from '../styles/Home.module.css';
import {Chart } from 'chart.js/auto';
import { Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import { actionA1 } from '@prisma/client';
import { actionTypes } from '../lib/constants';

export const getStaticProps: GetStaticProps = async () => {
  const iniciativas = await prisma.actionA1.findMany();

  return {
      props:{
          iniciativas: JSON.parse(JSON.stringify(iniciativas)),
      },
      revalidate: 10,
  }
}

export default function Home(props) {
  Chart.register(CategoryScale);
  const partList = [], mujList = [], indList = [], rurList = [];

  // Calculando numero de participantes
  for (const type of ["A1", "A2", "A3", "A4"]){
    console.log(type);
    partList.push(props.iniciativas.reduce((sum, action: actionA1) => (action.type === type) ? sum + action.nro_participantes : sum, 0))
  }

  // Calculando numero de mujeres
  for (const type of ["A1", "A2", "A3", "A4"]){
    console.log(type);
    mujList.push(props.iniciativas.reduce((sum, action: actionA1) => (action.type === type) ? sum + action.nro_mujeres : sum, 0))
  }
  
  // Calculando numero de poblacion indigena
  for (const type of ["A1", "A2", "A3", "A4"]){
    console.log(type);
    indList.push(props.iniciativas.reduce((sum, action: actionA1) => (action.type === type) ? sum + action.nro_pob_ind : sum, 0))
  }


  console.log(partList);
  return (
      <div className={styles.container}>
      <h2>Reports</h2>
      <div className="flex-container">
        <button>Nro.Participantes</button>
        <button>Mujeres</button>
        <button>Pob.rural</button>
        <button>Pob.ind</button>
        <button>LGBTIQ+</button>
      </div>
      <div className="charts">
        <Bar datasetIdKey='id' data={{
              labels: actionTypes,
              datasets:[{
                  // id: 1,
                  backgroundColor: 'rgba(210, 0, 0, 0.5)',
                  label: 'nro de participantes',
                  data: partList,
                },
                {
                  // id: 2,
                  label: 'nro de mujeres',
                  backgroundColor: 'rgba(0, 0, 255, 0.5)',
                  data: mujList,
                },
                {
                  // id: 3,
                  label: 'nro indigenas',
                  backgroundColor: 'rgba(0, 255, 20, 0.5)',
                  data: indList,
                },
                {
                  // id: 4,
                  label: 'nro poblacion rural',
                  backgroundColor: 'rgba(0, 50, 180, 0.5)',
                  data: rurList,
                }
              ]
          }} options={{plugins: {
            datalabels: {
              display: true,
            }
          }}} style={{display:"inline-block"}}/>
        <Bar datasetIdKey='id' data={{
              labels: actionTypes,
              datasets:[{
                  // id: 2,
                  label: 'nro de mujeres',
                  backgroundColor: 'rgba(0, 0, 255, 0.5)',
                  data: mujList,
                }]
          }} style={{display:"inline-block"}} />
      </div>
      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
