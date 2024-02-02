import styles from "./reportsnav.module.css";
import Link from "next/link";

export function LinkAbs(props){
    return (
        <Link href={"/charts/" + props.val} className={styles.anchor}>{props.val}</Link>
    );
}

export default function Reportsnav(){
    return (
        <div className={styles.mainav}>
            <div className={styles.navbar} >
                <LinkAbs val="nroParticipantes"/>
                <LinkAbs val="mujeres"/>
                <LinkAbs val="pobRural"/>
                <LinkAbs val="pobInd"/>
                <LinkAbs val="lgbtiq+"/>
                <Link href={"/charts/resumen/general"} className={styles.anchor}>general</Link>
                <Link href={"/reportslanding"} className={styles.anchor}>Menu</Link>
            </div>
        </div>
    );
}