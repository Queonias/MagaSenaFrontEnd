// Importações de bibliotecas externas
import { useState, useEffect, useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from 'next/router';
import AppContext from '../../components/AppContext';
import { getCookie } from 'cookies-next';

// Importações de componentes locais
import Card from "@/components/Card";
import Loader from "@/components/loading";

// Importações de estilos
import styles from "@/styles/home.module.css";

// Importações de serviços ou utilitários
import { requestGet } from "../../service/requests";
import { checkAuthentication } from "@/utils/checkAuthentication";


export default function Apostas({ resultados, numberOfApostas }) {
  const [result, setData] = useState(resultados);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const context = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const isAuthenticated = document.cookie.includes('authorization');
    const token = getCookie('authorization');
    if (!isAuthenticated) {
      context.setisLoggedIn(false);
      context.setErrorsContext('Usuário não autorizado');
      router.replace('/users/login');
    } else {
      checkAuthentication(token, router)
        .then(() => { 
            context.setisLoggedIn(true);
            context.setErrorsContext(false);
            setIsLoading(false);
        })
        .catch((error) => {
          context.setisLoggedIn(false);
          context.setErrorsContext(error.message);
          router.replace('/users/login');
        });
    }
  }, []);

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

  if (isLoading) {
    return (
      <div className={`${ styles.loading_container}`}>
        <Loader />
      </div>

    );
  }

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
