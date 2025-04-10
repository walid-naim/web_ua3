'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import styles from '../../styles/DetailEvenement.module.css'
import { formatDate } from '../../utils/formatDate'
import { useLanguage } from '../../contexts/LanguageContext'

export default function EventDetail() {
    const { id } = useParams()
    const { texts } = useLanguage()
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                const response = await fetch(`/api/evenements/${id}`)

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Event not found')
                    }
                    throw new Error('Failed to fetch event details')
                }

                const data = await response.json()
                setEvent(data)
            } catch (err) {
                console.error('Error fetching event details:', err)
                setError(err.message || 'Failed to load event details. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        // Only run on the client side
        if (typeof window !== 'undefined' && id) {
            fetchEventDetail()
        }
    }, [id])

    if (loading) {
        return (
            <div className="conteneur section">
                <div className={styles.retour}>
                    <Link href="/evenements">
                        <span className={styles.flecheRetour}>←</span> {texts.eventsBreadcrumb}
                    </Link>
                </div>
                <p>{texts.loadingEventDetails}</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="conteneur section">
                <div className={styles.retour}>
                    <Link href="/evenements">
                        <span className={styles.flecheRetour}>←</span> {texts.eventsBreadcrumb}
                    </Link>
                </div>
                <p className={styles.error}>{error}</p>
            </div>
        )
    }

    if (!event) {
        return (
            <div className="conteneur section">
                <div className={styles.retour}>
                    <Link href="/evenements">
                        <span className={styles.flecheRetour}>←</span> {texts.eventsBreadcrumb}
                    </Link>
                </div>
                <p>{texts.eventNotFound}</p>
            </div>
        )
    }

    // Metadata is now handled server-side

    return (
        <div className="conteneur section">
            <div className={styles.retour}>
                <Link href="/evenements">
                    <span className={styles.flecheRetour}>←</span> {texts.eventsBreadcrumb}
                </Link>
            </div>

            <div className={styles.contenu}>
                <div className={styles.contenuPrincipal}>
                    <div className={styles.imageHero}>
                        <img src={event.imageUrl} alt={event.title} />
                        <div className={styles.badge}>
                            <div className={styles.date}>{formatDate(event.date)}</div>
                        </div>
                    </div>

                    <h1 className={styles.titre}>{event.title}</h1>

                    <div className={styles.description}>
                        <h3>{texts.aboutEvent}</h3>
                        <div className={styles.separateur}></div>
                        <p>{event.description}</p>
                    </div>
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.carteTicket}>
                        <div className={styles.billet}>
                            <div className={styles.billetEntete}>
                                <span>ROCK EN BOIS</span>
                                <span>OTTAWA</span>
                            </div>
                            <div className={styles.billetContenu}>
                                <h3>{texts.information}</h3>
                                <div className={styles.infoLigne}>
                                    <span>{texts.date}:</span>
                                    <span>{formatDate(event.date)}</span>
                                </div>
                                <div className={styles.infoLigne}>
                                    <span>{texts.venue}:</span>
                                    <span>{event.location}</span>
                                </div>
                                <a
                                    href="#"
                                    className={styles.boutonTicket}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>{texts.book}</span>
                                </a>
                            </div>
                            <div className={styles.billetPerforation}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}