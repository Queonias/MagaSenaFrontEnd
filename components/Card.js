import styles from '../styles/card.module.css'

export default function Card({ resultados }) {
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate;
      }
  return (
    <>
      {resultados.map((jogo) => (
        <div className={ `card ${styles.card_numbers}` }>
          <div className="card-header">{`#${jogo.Conc}`}</div>
          <div className="card-body">
            <h5 className="card-title">{`Data:${formatDate(jogo.Data)}`}</h5>
            <div className="card-text">
              {jogo.Numeros.map((n) => (
                <span className={styles.numeros_sorteio}>{n}</span>
              ))}
            </div>
            <a href="#" className="btn btn-primary">
              Detalhes
            </a>
          </div>
        </div>
      ))}
    </>
  );
}
