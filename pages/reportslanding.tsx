import {Chart} from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import Link from 'next/link';
import styles from './reportslanding.module.css';
import { actionTypes, localidades, tipoComunidad } from '../lib/constants';

export const getStaticProps: GetStaticProps = async (ctx) => {
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
  return (
      <div className={styles.container}>
      <h2>Reports</h2>
      <div className={styles.reportsbar}>
        <h4>Resúmenes de su organizacion</h4>
        <Link href={"/charts/zone/"+localidades[0]} className={styles.anchor}>Resumen por Zona</Link>
        <Link href={"/charts/action/"+actionTypes[0]} className={styles.anchor}>Resumen por Tipo de Actividad</Link>
        <Link href={"/charts/comunidad/"+tipoComunidad[0]} className={styles.anchor}>Resumen por Tipo de Comunidad</Link>
        <h4>Resumen general de todas las organizaciones</h4>
        <Link href={"/charts/resumen/general"} className={styles.anchor}>General</Link>
      </div>
    </div>
  );
}
