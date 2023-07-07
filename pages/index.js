// Importações de bibliotecas externas
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

// Importações de componentes locais
import Card from "@/components/Card";
import Loader from "@/components/loading";

// Importações de estilos
import styles from "@/styles/home.module.css";

// Importações de serviços ou utilitários
import { requestGet } from "../service/requests";



export async function getStaticProps() {
  const endpoint = "/apostas";
  const params = { skip: 0 };
  const numberOfApostas = await requestGet(`apostas/count`, {});
  const result = await requestGet(endpoint, params);

  return {
    props: {
      resultados: result.data,
      numberOfApostas: +numberOfApostas.data,
    },
  };
}

export default function Home({ resultados, numberOfApostas }) {
  const [result, setData] = useState(resultados);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = async () => {
    try {
      const endpoint = "/apostas";
      const params = { skip: result.length };
      const { data } = await requestGet(endpoint, params);
      setData((prevData) => [...prevData, ...data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setHasMore(numberOfApostas > result.length);
  }, [result]);

  return (
    <div className={`container ${styles.container_mega}`}>
      <InfiniteScroll
        className={styles.infinite_scroll}
        dataLength={result.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
         <Loader/>
        }
        endMessage={<p>Yay! You have seen it all</p>}
      >
        <Card resultados={result} />
      </InfiniteScroll>
    </div>
  );
}
