import { requestGet } from "@/service/requests";
import styles from "../../styles/detailsId.module.css";
import { formatDate } from "../../utils/formatDate";
import RaffleBalls from "@/components/RaffleBalls";
import { useEffect, useState } from "react"; 
// import { splitByState } from "../../utils/splitByState";

export async function getStaticPaths() {
  const params = { limit: 2604 };
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

  useEffect(() => {
    if (jogo) {
      const [ details, bet ] = jogo;
      setDetalhes(details);
      setAposta(bet);
      setIsLoading(false);
    }
  }, []);
 
  // const array = splitByState(detalhes.cidade);

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
      </div>
      <div className={styles.container_details}>
        <div className={styles.side_left}>
          <h2>{detalhes?.ganhadores_faixa_1 ? `` : "Acumulou!"}</h2>
          {detalhes?.cidade !== "null" && (
            <p>Sorteio realizado em {detalhes?.cidade}</p>
          )}
          <RaffleBalls arryNum={aposta?.Numeros} />
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
              <p>{detalhes?.ganhadores_faixa_1 ? `${detalhes?.ganhadores_faixa_1} apostas ganhadoras, R$ ${aposta?.Premio}` : 'Não houve ganhadores'}</p>
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
