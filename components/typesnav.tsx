import styles from "./typesnav.module.css";
import Link from "next/link";

export function LinkAbs(props){
    return (
        <Link href={"/charts/" + props.val.toLowerCase()} className={styles.anchor}>{props.val}</Link>
    );
}

export default function Typesnav(){
    return (
        <div className={styles.mainav}>
            <div className={styles.navbar} >
                <LinkAbs val="A1"/>
                <LinkAbs val="A2"/>
                <LinkAbs val="A3"/>
                <LinkAbs val="A4"/>
                <Link href={"/reportslanding"} className={styles.anchor}>Menu</Link>
            </div>
        </div>
    );
}