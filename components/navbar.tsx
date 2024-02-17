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
    console.log(`USERNAME: ${username}`);
    return (
        <nav className={styles.mainav}>
            <Link href={"/"}>
                <Image src="/gen_sustentable_nobg.png" alt={''} width={380} height={170}/>
            </Link>
            <div className={styles.user}>
                <IconButton aria-label="user"  size="large" onClick={() => Router.push("/userInfo")}>
                    <Person sx={{color:'white'}}/>
                </IconButton>
                {
                    // username ? 
                    // <Link href="/api/logout">
                    //     {/* <button style={{padding:"0.8em"}}>Cerrar sesión</button>  */}
                    //     Cerrar Sesion
                    // </Link>
                    // : 
                    // <Link href="/login">
                    //     {/* <button style={{padding:"0.8em"}}>Iniciar sesión</button>  */}
                    //     Iniciar Sesion
                    // </Link>
                }
            </div>
            {/* <div className={styles.user}>
                <IconButton aria-label="user"  size="large" onClick={() => Router.push("/userInfo")}>
                    <Person sx={{color:'white'}}/>
                </IconButton>
                {session ? 
                  <div>
                    <button onClick={() => signOut()} style={{padding:"0.8em"}}>Cerrar sesión</button>
                  </div>
                    :
                <button onClick={() => signIn()} style={{padding:"0.8em"}}>Iniciar Sesión</button>
                }
            </div> */}
            <div className={styles.navbar}>
                <Link href={"/iniciativas"}>Ver Iniciativas</Link>
                <Link href={"/createAction"}>Introducir iniciativa</Link>
                <Link href={"/reportslanding"}>Ver Reportes</Link>
                <Link href={"/signup"}>Sign up</Link>
                <Link href={"/login"}>Login</Link>
                <Link href="/api/logout">Logout</Link>
                <IconButton aria-label="edit"  size="small" onClick={(e) => {e.stopPropagation();router.back()}}>
                    <ArrowBack sx={{color:'white'}}/>
                </IconButton>
            </div>
        </nav>
    );
}