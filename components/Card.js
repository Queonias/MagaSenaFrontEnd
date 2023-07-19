import Link from 'next/link';
import styles from '../styles/card.module.css';
import { formatDate } from '../utils/formatDate'
import RaffleBalls from './RaffleBalls';

export default function Card({ resultados }) {

  return (
    <>
      {resultados.map((jogo, i) => (
        <div key={ i } className={ `card ${styles.card_numbers}` }>
          <div className="card-header">{`#${jogo.Conc}`}</div>
          <div className="card-body">
            <h5 className="card-title">{`Data:${formatDate(jogo.Data)}`}</h5>
            <div className="card-text">
              <RaffleBalls arryNum={ jogo.Numeros } />
            </div>
            <Link className='btn btn-primary' href={`/apostas/${jogo.Conc}`}>Detalhes</Link>
          </div>
        </div>
      ))}
    </>
  );
}
