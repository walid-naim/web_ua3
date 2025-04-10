import styles from '../styles/CarteArtiste.module.css'

export default function CarteArtiste({ artiste }) {
    return (
        <div className={styles.carte}>
            <div className={styles.vinyle}>
                <div
                    className={styles.pochette}
                    style={{ backgroundImage: `url(${artiste.image})` }}
                >
                    <div className={styles.overlay}></div>
                </div>
                <div className={styles.disque}></div>
            </div>

            <div className={styles.contenu}>
                <h3 className={styles.nom}>{artiste.nom}</h3>
                <p className={styles.genre}>{artiste.genre}</p>
                <p className={styles.bio}>{artiste.bio}</p>
            </div>
        </div>
    )
}