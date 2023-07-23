import { requestGet } from "@/service/requests";
import styles from "../../styles/detailsId.module.css";
import { formatDate } from "../../utils/formatDate";
import RaffleBalls from "@/components/RaffleBalls";
import { useEffect, useState } from "react"; 
import { formatarReal } from "@/utils/formatReal";
// import { splitByState } from "../../utils/splitByState";

export async function getStaticPaths() {
  const params = { limit: 1 };
  const { data } = await requestGet("/apostas/details", params, "");
  const paths = data.map((jogo) => {
    return {
      params: { detailsId: jogo.concurso.toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const detailsId = context.params.detailsId;
  const { data } = await requestGet(`/apostas/details`, {}, detailsId);

  return {
    props: {
      jogo: data,
    },
  };
}



export default function Details({ jogo }) {
  const [isLoading, setIsLoading] = useState(true);
  const [detalhes, setDetalhes] = useState(false);
  const [aposta, setAposta] = useState(false);
  const [totalNumberOfBets, setTotalNumberOfBets] = useState(undefined);

  const fetchForMoreContest = async (conc) => {
    setIsLoading(true);
    const { data } = await requestGet(`/apostas/details`, {}, conc);
    const [ details, bet ] = data;
      setDetalhes(details);
      setAposta(bet);
      setIsLoading(false);
  }

  const sumConc = (conc) => {
    if (conc >= totalNumberOfBets) {
      fetchForMoreContest(totalNumberOfBets);
    } else {
      fetchForMoreContest(conc + 1);
    }
  }


  const lessConc = (conc) => {
    if (conc <= 1) {
      fetchForMoreContest(1);
    } else {
      fetchForMoreContest(conc - 1);
    }

  }

  const searchConc = (e) => {
    const conc = parseInt(e.target.value);
  
    // Verificar se o valor é um número inteiro válido
    if (!Number.isInteger(conc)) {
      console.log("Valor inválido: deve ser um número inteiro.");
      return;
    }
  
    if (e.key === "Enter") {
      if (conc <= 0) {
        fetchForMoreContest(1);
      } else if (conc > totalNumberOfBets) {
        fetchForMoreContest(totalNumberOfBets);
      } else {
        fetchForMoreContest(conc);
      }
    }
  };






  useEffect(() => {
    const fetchQuant = async () => {
      const response = await requestGet('/apostas/count');
      const numberOfBets = response.data;
      setTotalNumberOfBets(numberOfBets);
    }
    fetchQuant();
    if (jogo) {
      const [ details, bet ] = jogo;
      setDetalhes(details);
      setAposta(bet);
      setIsLoading(false);
    }
  }, []);
 
  if(isLoading) {
    return(
      <p>Carregando...</p>
    )
  }

  return (
    <div className={`${styles.details} container`}>
      <div className={`${styles.title}`}>
        <h3>
          <span>Resultados</span> Concurso{" "}
          {`${detalhes?.concurso} (${formatDate(aposta?.Data)})`}{" "}
        </h3>
        <div className={ `${styles.nav_buttons}` }>
          <div>
            <label>Buscar por concurso</label>
            <input 
              placeholder="Ex.: 2000" 
              type="number" 
              onKeyDown={(e) => searchConc(e)}
            />
          </div>
          
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-link" onClick={ () => lessConc(detalhes.concurso) }>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
              Anterior
            </button>
            <button type="button" class="btn btn-link" onClick={ () => { sumConc(detalhes.concurso) } }>
              Próximo
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
      <div className={styles.container_details}>
        <div className={styles.side_left}>
          <h2>{detalhes?.ganhadores_faixa_1 ? `` : "Acumulou!"}</h2>
          {detalhes?.cidade !== "null" && (
            <p>Sorteio realizado em {detalhes?.cidade}</p>
          )}
          {aposta.Numeros && <RaffleBalls arryNum={aposta?.Numeros} clas={'numeros_sorteio_datails'} />}
          <div>
            <p>Estimativa de prêmio do próximo concurso</p>
            <span>R$ {detalhes?.estimativa_para_o_próximo_concurso}</span>
          </div>
          <div>
            <p>Acumulado próximo concurso</p>
            <span>R$ {detalhes?.valor_acumulado_proximo_concurso}</span>
          </div>
        </div>
        <div className={styles.side_right}>
          <h1>Premiação</h1>
          <div>
            <div>
              <p><span>6 acertos</span></p>
              <p>{detalhes?.ganhadores_faixa_1 ? `${detalhes?.ganhadores_faixa_1} apostas ganhadoras, ${formatarReal(aposta?.Premio)}` : 'Não houve ganhadores'}</p>
            </div>
            <div>
            <p><span>5 acertos</span></p>
              <p>{detalhes?.ganhadores_faixa_2 ? `${detalhes?.ganhadores_faixa_2} apostas ganhadoras, R$ ${detalhes?.rateio_faixa_2}` : 'Não houve ganhadores'}</p>
            </div>
            <div>
            <p><span>4 acertos</span></p>
              <p>{detalhes?.ganhadores_faixa_3 ? `${detalhes?.ganhadores_faixa_3} apostas ganhadoras, R$ ${detalhes?.rateio_faixa_3}` : 'Não houve ganhadores'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
