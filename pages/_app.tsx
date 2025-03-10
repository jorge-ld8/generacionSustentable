import React, { useState } from 'react';
import Layout from '../components/layout';
import '../styles/global.css';
import {SessionProvider} from 'next-auth/react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from "chart.js/auto";
import { getCookie } from 'cookies-next';
import { SWRConfig } from 'swr';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

 
export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    let username = getCookie('username', { req, res });
    if (username == undefined){
        username = "";
    }
    return { props: {username} };
};
export default function App({ Component, pageProps}) {
    Chart.register(ChartDataLabels);
    const [user, setUser] = useState("");
    
    // Global SWR configuration
    const swrOptions = {
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        dedupingInterval: 5000, // dedupe identical requests within 5 seconds
        errorRetryCount: 3,
        fetcher: (url: string) => fetch(url).then(res => {
            if (!res.ok) {
                throw new Error('An error occurred while fetching the data.');
            }
            return res.json();
        })
    };
    
    return (
        <SessionProvider session={pageProps.session}>
            <SWRConfig value={swrOptions}>
                <Layout user={user}>
                    <Component {...pageProps} setUser={setUser}/>
                </Layout>
            </SWRConfig>
        </SessionProvider>
    )
}