import styles from '../styles/raffleBalls.module.css'

export default function RaffleBalls({ arryNum }) {
    return (
        <div className="card-text">
            {arryNum.map((n) => (
            <span className={styles.numeros_sorteio}>{n}</span>
            ))}
        </div>
    )
}