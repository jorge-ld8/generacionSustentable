import styles from '../styles/Home.module.css';
import {Chart } from 'chart.js/auto';
import { Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import { ActionA1 } from '@prisma/client';
import { actionTypes } from '../lib/constants';
import { useState, useEffect } from 'react';

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
  const [isMobile, setIsMobile] = useState(false);
  const partList = [], mujList = [], indList = [], rurList = [];
  
  // Check if we're on a mobile device
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculando numero de participantes
  for (const type of ["A1", "A2", "A3", "A4"]){
    partList.push(props.iniciativas.reduce((sum, action: ActionA1) => (action.type === type) ? sum + action.nro_participantes : sum, 0))
  }

  // Calculando numero de mujeres
  for (const type of ["A1", "A2", "A3", "A4"]){
    mujList.push(props.iniciativas.reduce((sum, action: ActionA1) => (action.type === type) ? sum + action.nro_mujeres : sum, 0))
  }
  
  // Calculando numero de poblacion indigena
  for (const type of ["A1", "A2", "A3", "A4"]){
    indList.push(props.iniciativas.reduce((sum, action: ActionA1) => (action.type === type) ? sum + action.nro_pob_ind : sum, 0))
  }

  return (
      <div className={styles.container}>
      <h2>Reports</h2>
      <div className={styles.buttonContainer}>
        <button className={styles.filterButton}>Nro.Participantes</button>
        <button className={styles.filterButton}>Mujeres</button>
        <button className={styles.filterButton}>Pob.rural</button>
        <button className={styles.filterButton}>Pob.ind</button>
        <button className={styles.filterButton}>LGBTIQ+</button>
      </div>
      <div className={styles.chartsContainer}>
        <div className={styles.chartWrapper}>
          <Bar 
            datasetIdKey='id' 
            data={{
              labels: actionTypes,
              datasets:[{
                  backgroundColor: 'rgba(210, 0, 0, 0.5)',
                  label: 'nro de participantes',
                  data: partList,
                },
                {
                  label: 'nro de mujeres',
                  backgroundColor: 'rgba(0, 0, 255, 0.5)',
                  data: mujList,
                },
                {
                  label: 'nro indigenas',
                  backgroundColor: 'rgba(0, 255, 20, 0.5)',
                  data: indList,
                },
                {
                  label: 'nro poblacion rural',
                  backgroundColor: 'rgba(0, 50, 180, 0.5)',
                  data: rurList,
                }
              ]
            }} 
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                datalabels: {
                  display: true,
                  color: '#000',
                  font: {
                    size: isMobile ? 8 : 12
                  }
                },
                legend: {
                  position: isMobile ? 'bottom' : 'top',
                  labels: {
                    boxWidth: isMobile ? 10 : 40,
                    font: {
                      size: isMobile ? 10 : 12
                    }
                  }
                }
              },
              scales: {
                x: {
                  ticks: {
                    font: {
                      size: isMobile ? 10 : 12
                    }
                  }
                },
                y: {
                  ticks: {
                    font: {
                      size: isMobile ? 10 : 12
                    }
                  }
                }
              }
            }}
          />
        </div>
        
        {!isMobile && (
          <div className={styles.chartWrapper}>
            <Bar 
              datasetIdKey='id' 
              data={{
                labels: actionTypes,
                datasets:[{
                    label: 'nro de mujeres',
                    backgroundColor: 'rgba(0, 0, 255, 0.5)',
                    data: mujList,
                  }]
              }} 
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  datalabels: {
                    display: true,
                    color: '#000',
                    font: {
                      size: 12
                    }
                  }
                }
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .charts {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
