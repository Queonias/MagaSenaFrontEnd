import styles from '../styles/rotaprotegida.module.css';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import AppContext from '../components/AppContext';

// Importe a função `requestPost` corretamente
import { requestPost } from '../service/requests';

export default function Rotaprotegida() {
//   const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const context = useContext(AppContext);

  // Passe o `router` como argumento para a função `checkAuthentication`
  async function checkAuthentication(token) {
    try {
      await requestPost("/user/me", {}, token);
    } catch (err) {
      router.replace('/users/login');
      if (err.response && err.response.data && err.response.data.error) {
        throw new Error(err.response.data.error);
      } else {
         throw new Error("An error occurred");
      }
    }
  }

  useEffect(() => {
    const isAuthenticated = document.cookie.includes('authorization');
    const token = getCookie('authorization');
    if (!isAuthenticated) {
      context.setisLoggedIn(false);
      context.setErrorsContext('Usuário não autorizado');
      router.replace('/users/login');
    } else {
      checkAuthentication(token)
        .then(() => { 
            context.setisLoggedIn(true);
            setIsLoading(false);
            context.setErrorsContext(false);
        })
        .catch((error) => {
          context.setisLoggedIn(false);
          context.setErrorsContext(error.message);
          router.replace('/users/login');
        });
    }
  }, []);

  if (isLoading) {
    return (
      <div className={styles.rotaprotegida}>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className={styles.rotaprotegida}>
      <p>Protegida</p>
    </div>
  );
}
