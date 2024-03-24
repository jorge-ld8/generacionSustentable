import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import { ArrowBack, Person } from "@mui/icons-material";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getCookie } from "cookies-next";

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    let username = getCookie('username', { req, res });
    if (username == undefined){
        username = null;
    }
    return { props: {username} };
};

export default function Navbar({username}){
    const router = useRouter();
    const {data: session } = useSession();
    console.log("Re render");
    return (
        <nav className={styles.mainav} style={{position:"fixed"}}>
            <Link href={"/"}>
                <Image src="/generacion_sustentable_nobg.png" alt={''} width={300} height={170} unoptimized/>
            </Link>
            <div className={styles.user}>
                <span style={{color: "white", fontWeight: "bold"}}>
                {username?
                 `User: ${username}`
                    :
                 `No ha iniciado sesión`
                }
                </span>
                {/* <span style={{color: "white", fontWeight: "bold"}}>User: {username}</span> */}
                <IconButton aria-label="user"  size="large" onClick={() => Router.push("/userInfo")}>
                    <Person sx={{color:'white'}}/>
                </IconButton>
            </div>
            {username ?
            <div className={styles.navbar}>
                <Link href={"/iniciativas"}>Ver Iniciativas</Link>
                <Link href={"/createAction"}>Introducir iniciativa</Link>
                <Link href={"/reportslanding"}>Ver Reportes</Link>
                <IconButton aria-label="edit"  size="small" onClick={(e) => {e.stopPropagation();router.back()}}>
                    <ArrowBack sx={{color:'white'}}/>
                </IconButton>
            </div>
            :
            <div className={styles.navbar}>
                <Link href={"/login"}>Iniciar Sesion</Link>
            </div>
            }

        </nav>
    );
}