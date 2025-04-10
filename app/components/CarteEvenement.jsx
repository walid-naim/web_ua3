'use client'

import Link from 'next/link'
import styles from '../styles/CarteEvenement.module.css'
import { formatDate } from '../utils/formatDate'
import { useLanguage } from '../contexts/LanguageContext'

export default function EventCard({ event }) {
    const { texts } = useLanguage()

    return (
        <Link href={`/evenements/${event.id}`} className={styles.carte}>
            <div
                className={styles.image}
                style={{ backgroundImage: `url(${event.imageUrl})` }}
            >
                <div className={styles.overlay}></div>
                <div className={styles.etiquette}>
                    <span className={styles.date}>{formatDate(event.date)}</span>
                </div>
            </div>
            <div className={styles.contenu}>
                <h3 className={styles.titre}>{event.title}</h3>
                <p className={styles.lieu}>{event.location}</p>
                <div className={styles.voirPlus}>
                    {texts.details}
                    <span className={styles.icone}>♪</span>
                </div>
            </div>
        </Link>
    )
}