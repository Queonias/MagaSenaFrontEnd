import style from '../styles/about.module.css';
import { getCookie } from 'cookies-next';
import AppContext from '../components/AppContext';
import { useEffect, useContext } from "react";
import { checkAuthentication } from '@/utils/checkAuthentication';

export default function About() {
    const context = useContext(AppContext);

    useEffect(() => {
        const isAuthenticated = document.cookie.includes('authorization');
        const token = getCookie('authorization');
        if (!isAuthenticated) {
          context.setisLoggedIn(false);
        } else {
          checkAuthentication(token)
            .then(() => { 
                context.setisLoggedIn(true);
                context.setErrorsContext(false);
            })
            .catch(() => {
              context.setisLoggedIn(false);
            });
        }
      }, []);

    return(
        <div className={ `container ${style.about_container}` }>
            <h1>Sobre nós</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem excepturi hic obcaecati nam animi quibusdam dignissimos earum maxime. Blanditiis, magni.</p>
        </div>
    );
}