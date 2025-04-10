'use client'

import { useState, useEffect } from 'react'
import styles from '../styles/Evenements.module.css'
import { useLanguage } from '../contexts/LanguageContext'
import EventCard from '../components/CarteEvenement'

export default function Events() {
    const { texts } = useLanguage()
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/evenements')

                if (!response.ok) {
                    throw new Error('Failed to fetch events')
                }

                const data = await response.json()
                setEvents(data)
            } catch (err) {
                console.error('Error fetching events:', err)
                setError(texts.errorLoadingEvents)
            } finally {
                setLoading(false)
            }
        }

        // Only fetch on the client side
        if (typeof window !== 'undefined') {
            fetchEvents()
        }
    }, [])

    if (loading) {
        return (
            <div className="conteneur section">
                <div className={styles.entete}>
                    <h1 className={styles.titre}>{texts.eventsTitle}</h1>
                    <p>{texts.loadingEvents}</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="conteneur section">
                <div className={styles.entete}>
                    <h1 className={styles.titre}>{texts.eventsTitle}</h1>
                    <p className={styles.error}>{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="conteneur section">
            <div className={styles.entete}>
                <h1 className={styles.titre}>{texts.eventsTitle}</h1>
                <p className={styles.sousTitre}>{texts.eventsSubtitle}</p>
            </div>

            <div className={styles.grille}>
                {events.map((event) => (
                    <div key={event.id} className={styles.item}>
                        <EventCard event={event} />
                    </div>
                ))}
            </div>
        </div>
    )
}