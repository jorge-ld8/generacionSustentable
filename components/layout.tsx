import React from 'react';
import styles from './layout.module.css';
import Navbar from './navbar';
import Footer from './footer';
import Image from 'next/image';


export default function Layout({ children }) {

    return (
        <div className ="container">
            <div className="left">
                <Navbar/>
            </div>
            <main className={styles.container}>
                {/* <img src="/home/jorgegetsmad/servicioComunitarioFront/scom/components/logos_completos.jpg" alt="" /> */}
                <Image src="/logos_completos.jpg" alt={''} width={500} height={150}/>
                {children}
                <Footer/>
            </main>
        </div>
    );
}
