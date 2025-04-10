import './globals.css'
import Navigation from './components/Navigation.jsx'
import PiedDePage from './components/PiedDePage.jsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'

export const metadata = {
    title: {
        default: 'Rock en Bois Ottawa',
        template: '%s | Rock en Bois Ottawa'
    },
    description: 'Festival de rock acoustique dans un cadre unique à Ottawa',
    keywords: 'rock acoustique, festival, Ottawa, musique, concerts, folk',
}

export default function RootLayout({ children }) {
    return (
        <html lang="fr" suppressHydrationWarning>
        <body suppressHydrationWarning>
        <ThemeProvider>
            <LanguageProvider>
                <Navigation />
                <main className="contenu-principal">{children}</main>
                <PiedDePage />
            </LanguageProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}