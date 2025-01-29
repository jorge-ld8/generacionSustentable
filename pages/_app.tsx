import React, { useState } from 'react';
import Layout from '../components/layout';
import '../styles/global.css';
import {SessionProvider} from 'next-auth/react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from "chart.js/auto";
import { getCookie } from 'cookies-next';
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
export default function App({ Component, pageProps, username}) {
    // deployment testing
    Chart.register(ChartDataLabels);
    const [user, setUser] = useState("");
    return (
        <SessionProvider session={pageProps.session}>
            <Layout user={user}>
                <Component {...pageProps} setUser={setUser}/>
            </Layout>
        </SessionProvider>
    )
}