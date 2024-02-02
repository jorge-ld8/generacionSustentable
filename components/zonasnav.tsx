import styles from "./reportsnav.module.css";
import Link from "next/link";

export function LinkAbs(props){
    return (
        <Link href={"/charts/" + props.val} className={styles.anchor}>{props.val}</Link>
    );
}

export default function Zonasnav(){
    return (
        <div className={styles.mainav}>
            <div className={styles.navbar} >
                <LinkAbs val="deltaAmacuro"/>
                <LinkAbs val="carabobo"/>
                <LinkAbs val="distritoCapital"/>
                <Link href={"/reportslanding"} className={styles.anchor}>Menu</Link>
            </div>
        </div>
    );
}