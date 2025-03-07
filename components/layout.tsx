import React from 'react';
import styles from './layout.module.css';
import Navbar from './navbar';
import Image from 'next/image';

export default function Layout({ children, user}) {
    console.log("render layout");
    return (
        <div className ="container" style={{display: 'flex'}}>
            <div className={styles.left}>
                <Navbar username={user}/>
            </div>
            <main className={styles.container}>
                <Image src="/logos_horizontal.png" alt={''} width={610} height={140} sizes="(max-width: 1400px) 300px"/>
                {children}
            </main>
        </div>
    );
}