import { actionTypes } from "../lib/constants";
import styles from "./typesnav.module.css";
import Link from "next/link";

export function LinkAbs(props){
    return (
        <Link href={"/charts/action/" + props.val} className={styles.anchor}>{props.val}</Link>
    );
}

export default function Typesnav(){
    return (
        <div className={styles.mainav}>
            <div className={styles.navbar} >
                {actionTypes.map((x)=><LinkAbs val={x}/>)}
                <Link href={"/reportslanding"} className={styles.anchor}>Menu</Link>
            </div>
        </div>
    );
}