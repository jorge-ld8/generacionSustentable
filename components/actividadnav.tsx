import styles from "./reportsnav.module.css";
import Link from "next/link";

export function LinkAbs(props){
    return (
        <Link href={"/charts/" + props.val} className={styles.anchor}>{props.val}</Link>
    );
}

export default function Actividadnav(){
    return (
        <div className={styles.mainav}>
            <div className={styles.navbar} >
                <LinkAbs val="a1"/>
                <LinkAbs val="a2"/>
                <LinkAbs val="a3"/>
                <LinkAbs val="a4"/>
                <Link href={"/reportslanding"} className={styles.anchor}>Menu</Link>
            </div>
        </div>
    );
}