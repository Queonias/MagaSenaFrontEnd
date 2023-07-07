import Card from "@/components/Card";
import styles from "@/styles/home.module.css";
import { requestGet } from '../service/requests';
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from 'react';

export async function getStaticProps() {
  const endpoint = "/apostas";
  const params = { skip: 0 }
  const numberOfApostas = await requestGet(`apostas/count`, {});
  const result = await requestGet(endpoint, params);


  return {
    props: {
      resultados: result.data,
      numberOfApostas: +numberOfApostas.data
    },
  };
}

export default function Home({ resultados, numberOfApostas }) {
  const [result, setData] = useState(resultados);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = async () => {
    try {
      const endpoint = "/apostas";
      const params = { skip: result.length }
      const { data } = await requestGet(endpoint, params);
      setData(prevData => [...prevData, ...data]);
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
        loader={<h4>Loading...</h4>}
        endMessage={
          <p>Yay! You have seen it all</p>
        }
      >
        <Card resultados={ result } />
      </InfiniteScroll>
    </div>
  );
}
