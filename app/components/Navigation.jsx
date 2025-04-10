
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '../styles/Navigation.module.css'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'

export default function Navigation() {
    const [menuOuvert, setMenuOuvert] = useState(false)
    const pathname = usePathname()
    const { theme, toggleTheme } = useTheme()
    const { language, toggleLanguage, texts } = useLanguage()

    const basculerMenu = () => {
        setMenuOuvert(!menuOuvert)
    }

    const fermerMenu = () => {
        setMenuOuvert(false)
    }

    const estActif = (chemin) => {
        return pathname === chemin ? styles.actif : ''
    }

    return (
        <header className={styles.header}>
            <nav className={`${styles.navbar} conteneur`}>
                <Link href="/" className={styles.logo} onClick={fermerMenu}>
                    <span className={styles.logoTexte}>Rock en Bois</span>
                    <span className={styles.logoAccent}>Ottawa</span>
                </Link>

                <div className="toggleContainer">
                    <button
                        className="themeToggle"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? texts.lightTheme : texts.darkTheme}
                    </button>
                    <button
                        className="langToggle"
                        onClick={toggleLanguage}
                        aria-label="Toggle language"
                    >
                        {language === 'fr' ? 'EN' : 'FR'}
                    </button>
                </div>

                <button
                    className={styles.boutonMenu}
                    aria-label="Basculer le menu"
                    onClick={basculerMenu}
                >
                    <div className={`${styles.hamburger} ${menuOuvert ? styles.ouvert : ""}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>

                <div className={`${styles.liens} ${menuOuvert ? styles.ouvert : ""}`}>
                    <Link
                        href="/"
                        className={`${styles.lien} ${estActif("/")}`}
                        onClick={fermerMenu}
                    >
                        {texts.home}
                    </Link>
                    <Link
                        href="/evenements"
                        className={`${styles.lien} ${estActif("/evenements")}`}
                        onClick={fermerMenu}
                    >
                        {texts.events}
                    </Link>
                    <Link
                        href="/contact"
                        className={`${styles.lien} ${estActif("/contact")}`}
                        onClick={fermerMenu}
                    >
                        {texts.contact}
                    </Link>
                </div>
            </nav>
        </header>
    );
}