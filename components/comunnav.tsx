import { tipoComunidad } from "../lib/constants";
import styles from "./reportsnav.module.css";
import Link from "next/link";

export function LinkAbs(props){
    return (
        <Link href={"/charts/comunidad/" + props.val} className={styles.anchor}>{props.val}</Link>
    );
}

export default function Comunidadnav(){
    return (
        <div className={styles.mainav}>
            <div className={styles.navbar} >
                {tipoComunidad.map((x)=><LinkAbs val={x}/>)}
                <Link href={"/reportslanding"} className={styles.anchor}>Menu</Link>
            </div>
        </div>
    );
}