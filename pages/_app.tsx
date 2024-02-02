import React from 'react';
import Layout from '../components/layout';
import '../styles/global.css';
import {SessionProvider} from 'next-auth/react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from "chart.js/auto";
 
export default function App({ Component, pageProps }) {
    Chart.register(ChartDataLabels);
    return (
        <SessionProvider session={pageProps.session}>
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        </SessionProvider>
    )
}