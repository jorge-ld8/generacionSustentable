import React, { useState } from 'react';
import styles from './layout.module.css';
import Navbar from './navbar';
import Image from 'next/image';
import { getCookie } from 'cookies-next';

export default function Layout({ children, user}) {
    console.log("re render layout");
    return (
        <div className ="container">
            <div className="left">
                <Navbar username={user}/>
            </div>
            <main className={styles.container}>
                {/* <img src="/home/jorgegetsmad/servicioComunitarioFront/scom/components/logos_completos.jpg" alt="" /> */}
                <Image src="/logos_horizontal.png" alt={''} width={610} height={140}/>
                {children}
            </main>
        </div>
    );
}
