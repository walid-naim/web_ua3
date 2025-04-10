// contexts/LanguageContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Define translations
const translations = {
    fr: {
        // Navigation
        home: 'Accueil',
        events: 'Événements',
        contact: 'Contact',

        // Home page
        heroTitle: 'ROCK EN BOIS OTTAWA',
        heroSubtitle: 'Le meilleur de la musique acoustique dans un cadre intimiste',
        upcoming: 'Artistes à l\'affiche',
        viewAll: 'Voir tous les événements',
        loadingEvents: 'Chargement des événements...',

        // Events page
        eventsBreadcrumb: 'Retour aux événements',
        eventsTitle: 'Nos Événements',
        eventsSubtitle: 'Découvrez tous nos concerts de rock acoustique à Ottawa',
        details: 'Voir détails',
        loadingEventDetails: 'Chargement des détails de l\'événement...',
        eventNotFound: 'Événement non trouvé',
        errorLoadingEvents: 'Erreur lors du chargement des événements. Veuillez réessayer ultérieurement.',

        // Event details
        venue: 'Lieu',
        date: 'Date',
        time: 'Heure',
        price: 'Prix',
        capacity: 'Capacité',
        book: 'Réserver',
        artists: 'Artistes à l\'Affiche',
        aboutEvent: 'À Propos de l\'Événement',
        information: 'Informations',

        // Contact page
        contactTitle: 'Contactez-Nous',
        contactSubtitle: 'Nous sommes à votre écoute',
        name: 'Nom',
        nameRequired: 'Le nom est requis',
        email: 'Email',
        emailRequired: 'L\'email est requis',
        emailInvalid: 'Veuillez entrer une adresse email valide',
        message: 'Message',
        messageRequired: 'Le message est requis',
        messageMinLength: 'Le message doit contenir au moins 10 caractères',
        send: 'Envoyer le message',
        sending: 'Envoi en cours...',
        thankYou: 'Merci pour votre message!',
        replyText: 'Nous vous répondrons dans les plus brefs délais.',
        anotherMessage: 'Envoyer un autre message',

        // Theme & Language
        lightTheme: 'Thème Clair',
        darkTheme: 'Thème Sombre',
        language: 'Langue',

        // Footer
        footerTitle: 'Rock en Bois Ottawa',
        footerSubtitle: 'Le meilleur de la musique acoustique',
        copyright: '© 2025 Rock en Bois Ottawa. Tous droits réservés.'
    },
    en: {
        // Navigation
        home: 'Home',
        events: 'Events',
        contact: 'Contact',

        // Home page
        heroTitle: 'ROCK EN BOIS OTTAWA',
        heroSubtitle: 'The best acoustic music in an intimate setting',
        upcoming: 'Featured Artists',
        viewAll: 'View all events',
        loadingEvents: 'Loading events...',

        // Events page
        eventsBreadcrumb: 'Back to events',
        eventsTitle: 'Our Events',
        eventsSubtitle: 'Discover all our acoustic rock concerts in Ottawa',
        details: 'View details',
        loadingEventDetails: 'Loading event details...',
        eventNotFound: 'Event not found',
        errorLoadingEvents: 'Failed to load events. Please try again later.',

        // Event details
        venue: 'Venue',
        date: 'Date',
        time: 'Time',
        price: 'Price',
        capacity: 'Capacity',
        book: 'Book Now',
        artists: 'Featured Artists',
        aboutEvent: 'About the Event',
        information: 'Information',

        // Contact page
        contactTitle: 'Contact Us',
        contactSubtitle: 'We\'d love to hear from you',
        name: 'Name',
        nameRequired: 'Name is required',
        email: 'Email',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email address',
        message: 'Message',
        messageRequired: 'Message is required',
        messageMinLength: 'Message must be at least 10 characters',
        send: 'Send Message',
        sending: 'Sending...',
        thankYou: 'Thank you for your message!',
        replyText: 'We\'ll get back to you as soon as possible.',
        anotherMessage: 'Send another message',

        // Theme & Language
        lightTheme: 'Light Theme',
        darkTheme: 'Dark Theme',
        language: 'Language',

        // Footer
        footerTitle: 'Rock en Bois Ottawa',
        footerSubtitle: 'The best acoustic music experience',
        copyright: '© 2025 Rock en Bois Ottawa. All rights reserved.'
    }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('fr'); // Default to French
    const [texts, setTexts] = useState(translations.fr);

    // Initialize language from localStorage on mount - client-side only
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem('language');
            if (savedLanguage && translations[savedLanguage]) {
                setLanguage(savedLanguage);
                setTexts(translations[savedLanguage]);
            }
        }
    }, []);

    // Toggle language
    const toggleLanguage = () => {
        const newLanguage = language === 'fr' ? 'en' : 'fr';
        setLanguage(newLanguage);
        setTexts(translations[newLanguage]);
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', newLanguage);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, texts }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}