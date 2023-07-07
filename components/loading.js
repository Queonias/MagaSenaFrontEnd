import styles from '../styles/loading.module.css';

export default function Loader() {
  return (
    <div className={styles.loading_container}>
      <div
        className={`spinner-border text-success`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
