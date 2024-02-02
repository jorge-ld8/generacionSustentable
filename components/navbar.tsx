import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import { ArrowBack, Person } from "@mui/icons-material";
import Router, { useRouter } from "next/router";
import { useSession, signIn, signOut  } from "next-auth/react";

export default function Navbar(){
    const router = useRouter();
    
    const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;

    // const { data: session, status } = useSession();
    const { data: session } = useSession();

    return (
        <nav className={styles.mainav}>
            <div className={styles.user}>
                <IconButton aria-label="user"  size="large" onClick={() => Router.push("/")}>
                    <Person sx={{color:'white'}}/>
                </IconButton>
                {session ? 
                  <div>
                    You are logged in
                    <button onClick={() => signOut()}>Sign out</button>
                  </div>
                    :
                <button onClick={() => signIn()}>Sign in</button>
                }
            </div>
            <div className={styles.navbar}>
                <Link href={"/iniciativas"}>Ver Iniciativas</Link>
                <Link href={"/createAction"}>Introducir iniciativa</Link>
                <Link href={"/reportslanding"}>Ver Reportes</Link>
                {/* <Link href={"/charts/lgbtiq+"}>Ver Reportes</Link> */}
                <Link href={"/"}>Ajustes</Link>
                <IconButton aria-label="edit"  size="small" onClick={(e) => {e.stopPropagation();router.back()}}>
                    <ArrowBack sx={{color:'white'}}/>
                </IconButton>
            </div>
        </nav>
    );
}