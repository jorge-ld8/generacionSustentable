import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import { ArrowBack, Person } from "@mui/icons-material";
import Router, { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Button from "@mui/material/Button";

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
    console.log("render navbar");
    return (
        <nav className={styles.mainav}>
            <Link href={"/"}>
                <Image src="/generacion_sustentable_nobg.png" alt={''} width={380} height={170} unoptimized sizes="(max-width: 1400px) 290px"/>
            </Link>
            <div className={styles.user}>
                <span style={{color: "white", fontWeight: "bold"}}>
                {username?
                 `User: ${username}`
                    :
                 `No ha iniciado sesión`
                }
                </span>
                {username ? 
                <IconButton aria-label="user"  size="large" onClick={() => Router.push("/userInfo")}>
                    <Person sx={{color:'white'}}/>
                </IconButton>
                :
                null
                }
            </div>
            <div style={{position: "fixed", bottom: 6, left: 10, textAlign: "center", color: "rgba(250,250,250,.9)", fontSize: ".75em"}}>Made by <a href="https://github.com/jorge-ld8">Jorge León</a></div>
            {username ?
            <div className={styles.navbar}>
                <Link href={"/iniciativas"}>Ver Actividades Realizadas</Link>
                <Link href={"/createAction"}>Introducir actividad</Link>
                <Link href={"/reportslanding"}>Ver Reportes de indicadores</Link>
                <Button onClick={()=>{Router.push("/api/logout");Router.push("/")}} variant='contained' style={{backgroundColor: "red", margin: ".75em"}}>Cerrar sesion</Button>
                <IconButton aria-label="edit"  size="small" onClick={(e) => {e.stopPropagation();router.back()}}>
                    <ArrowBack sx={{color:'white'}}/>
                </IconButton>
            </div>
            :
            <div className={styles.navbar}>
                <Link href={"/login"}>Iniciar Sesion</Link>
            </div>
            }
        <style jsx>{`
        a:visited{
            color: inherit;
            text-decoration: none;
        }
          `}</style>
        </nav>
    );
}