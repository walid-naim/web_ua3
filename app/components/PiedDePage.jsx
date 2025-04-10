'use client'

import Link from 'next/link'
import styles from '../styles/PiedDePage.module.css'
import { useLanguage } from '../contexts/LanguageContext'

export default function PiedDePage() {
    const { language, texts } = useLanguage()
    const anneeActuelle = new Date().getFullYear()

    const footerTexts = {
        fr: {
            title: 'Rock en Bois Ottawa',
            subtitle: 'Le meilleur de la musique acoustique',
            copyright: `© ${anneeActuelle} Rock en Bois Ottawa. Tous droits réservés.`
        },
        en: {
            title: 'Rock en Bois Ottawa',
            subtitle: 'The best acoustic music experience',
            copyright: `© ${anneeActuelle} Rock en Bois Ottawa. All rights reserved.`
        }
    }

    const currentFooterTexts = footerTexts[language]

    return (
        <footer className={styles.piedDePage}>
            <div className="conteneur">
                <div className={styles.contenu}>
                    <div className={styles.marque}>
                        <h2 className={styles.logo}>{currentFooterTexts.title}</h2>
                        <p>{currentFooterTexts.subtitle}</p>
                    </div>
                </div>

                <div className={styles.bas}>
                    <hr className={styles.separateur} />
                    <p className={styles.copyright}>
                        {currentFooterTexts.copyright}
                    </p>
                </div>
            </div>
        </footer>
    )
}