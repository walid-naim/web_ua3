'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './styles/Accueil.module.css'
import { useLanguage } from './contexts/LanguageContext'
import EventCard from './components/CarteEvenement'

export default function Home() {
    const { texts } = useLanguage()
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/evenements')

                if (response.ok) {
                    const data = await response.json()
                    // Only show the first 3 upcoming events
                    setEvents(data.slice(0, 3))
                }
            } catch (error) {
                console.error('Error fetching events:', error)
            } finally {
                setLoading(false)
            }
        }

        // Only run on the client side
        if (typeof window !== 'undefined') {
            fetchEvents()
        }
    }, [])

    return (
        <>
            <section className={styles.hero}>
                <div className={styles.heroContenu}>
                    <h1>{texts.heroTitle}</h1>
                    <p>{texts.heroSubtitle}</p>
                </div>
            </section>

            <section className={`section ${styles.artistesSection}`}>
                <div className="conteneur">
                    <h2>{texts.upcoming}</h2>

                    {loading ? (
                        <p>{texts.loadingEvents}</p>
                    ) : (
                        <div className={styles.grille}>
                            {events.map((event) => (
                                <div key={event.id} className={styles.item}>
                                    <EventCard event={event} />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className={styles.voirPlus}>
                        <Link href="/evenements" className="bouton">
                            {texts.viewAll}
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}