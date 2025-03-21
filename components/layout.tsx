import React, { useState, useEffect } from 'react';
import styles from './layout.module.css';
import Navbar from './navbar';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Layout({ children, user}) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Prevent body scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [mobileMenuOpen]);
    
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    
    return (
        <div className="container">
            {/* Mobile menu toggle button - only visible on small screens */}
            <div className={styles.mobileMenuToggle}>
                <IconButton 
                    onClick={toggleMobileMenu} 
                    aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    size="large"
                >
                    {mobileMenuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
                </IconButton>
            </div>
            
            {/* Mobile menu overlay - only visible when menu is open */}
            <div 
                className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
            ></div>
            
            {/* Left sidebar with navigation */}
            <div className={`${styles.left} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <Navbar username={user} mobileMenuOpen={mobileMenuOpen} />
            </div>
            
            {/* Main content area */}
            <main className={styles.container}>
                <div className={styles.logoContainer}>
                    <Image 
                        src="/logos_horizontal.png" 
                        alt="Logo" 
                        width={610} 
                        height={140} 
                        className={styles.responsiveImage}
                        priority
                    />
                </div>
                {children}
            </main>
        </div>
    );
}