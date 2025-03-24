import Image from "next/image";
import styles from "./navbar.module.css";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import { ArrowBack, Person, Close } from "@mui/icons-material";
import Router, { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    let username = getCookie('username', { req, res });
    if (username == undefined){
        username = null;
    }
    return { props: {username} };
};

export default function Navbar({ username, mobileMenuOpen, closeMobileMenu }) {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);
    
    // Check if we're on mobile/tablet
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 1024);
        };
        
        // Initial check
        checkIsMobile();
        
        // Add event listener for window resize
        window.addEventListener('resize', checkIsMobile);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);
    
    // Handle navigation while closing menu if on mobile
    const handleNavClick = (e, path) => {
        if (isMobile) {
            e.preventDefault();
            closeMobileMenu();
            // Small delay to allow menu animation to start before navigation
            setTimeout(() => {
                router.push(path);
            }, 50);
        }
    };
    
    // Handle logout while closing menu if on mobile
    const handleLogout = (e) => {
        if (isMobile) {
            e.preventDefault();
            closeMobileMenu();
            // Small delay to allow menu animation to start before navigation
            setTimeout(() => {
                Router.push("/api/logout");
                Router.push("/");
            }, 50);
        } else {
            Router.push("/api/logout");
            Router.push("/");
        }
    };
    
    return (
        <nav className={`${styles.mainav} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
            <div className={styles.closeButton}>
                <IconButton 
                    onClick={closeMobileMenu}
                    aria-label="close menu"
                    size="large"
                >
                    <Close sx={{ color: 'white' }} fontSize="large" />
                </IconButton>
            </div>
            <Link href={"/"} onClick={(e) => handleNavClick(e, "/")}>
                <Image src="/generacion_sustentable_nobg.png" alt={''} width={380} height={170} unoptimized sizes="(max-width: 1400px) 290px"/>
            </Link>
            <div className={styles.user}>
                <span className={styles.userInfo} style={{color: "white", fontWeight: "bold"}}>
                {username?
                 `User: ${username}`
                    :
                 `No ha iniciado sesión`
                }
                </span>
                {username ? 
                <IconButton 
                    aria-label="user" 
                    size="large" 
                    onClick={() => {
                        if (isMobile) closeMobileMenu();
                        Router.push("/userInfo")
                    }}
                >
                    <Person sx={{color:'white'}}/>
                </IconButton>
                :
                null
                }
            </div>
            <div style={{visibility: isMobile ? (mobileMenuOpen ? "visible" : "hidden") : "visible", position: "fixed", bottom: 6, left: 10, textAlign: "center", color: "rgba(250,250,250,.9)", fontSize: ".8rem"}}>Made by <a href="https://github.com/jorge-ld8" style={{fontSize: ".8rem"}}>Jorge León</a></div>
            {username ?
            <div className={styles.navbar}>
                <Link href={"/iniciativas"} onClick={(e) => handleNavClick(e, "/iniciativas")}>
                    Ver Actividades Realizadas
                </Link>
                <Link href={"/createAction"} onClick={(e) => handleNavClick(e, "/createAction")}>
                    Introducir actividad
                </Link>8
                <Link href={"/reportslanding"} onClick={(e) => handleNavClick(e, "/reportslanding")}>
                    Ver Reportes de indicadores
                </Link>
                <Button 
                    onClick={handleLogout} 
                    variant='contained' 
                    style={{backgroundColor: "red", margin: ".75em"}}
                >
                    Cerrar sesion
                </Button>
                <IconButton 
                    aria-label="edit" 
                    size="small" 
                    onClick={(e) => {
                        e.stopPropagation();
                        if (isMobile) closeMobileMenu();
                        router.back();
                    }}
                >
                    <ArrowBack sx={{color:'white'}}/>
                </IconButton>
            </div>
            :
            <div className={styles.navbar}>
                <Link href={"/login"} onClick={(e) => handleNavClick(e, "/login")}>
                    Iniciar Sesion
                </Link>
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