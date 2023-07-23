import styles from '../styles/raffleBalls.module.css'

export default function RaffleBalls({ arryNum, clas }) {
    return (
        <div className="card-text">
            {arryNum.map((n) => (
            <span className={styles[clas]}>{n}</span>
            ))}
        </div>
    )
}