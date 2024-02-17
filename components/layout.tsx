import React, { useState } from 'react';
import styles from './layout.module.css';
import Navbar from './navbar';
import Footer from './footer';
import Image from 'next/image';
import { getCookie } from 'cookies-next';

// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res
//     let username = getCookie('username', { req, res });
//     if (username == undefined){
//         username = null;
//     }
//     return { props: {username} };
// };

export default function Layout({ children }) {
    return (
        <div className ="container">
            <div className="left">
                <Navbar username={null}/>
            </div>
            <main className={styles.container}>
                {/* <img src="/home/jorgegetsmad/servicioComunitarioFront/scom/components/logos_completos.jpg" alt="" /> */}
                <Image src="/logos_horizontal.png" alt={''} width={610} height={140}/>
                {children}
                <Footer/>
            </main>
        </div>
    );
}
