import styles from '../styles/GalerieArtistes.module.css'
import CarteArtiste from './CarteArtiste'
import artistes from '../data/artistes.json'

export default function GalerieArtistes() {
    return (
        <div className={styles.galerie}>
            {artistes.artistes.map(artiste => (
                <div key={artiste.id} className={styles.item}>
                    <CarteArtiste artiste={artiste} />
                </div>
            ))}
        </div>
    )
}
