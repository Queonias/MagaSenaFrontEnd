import { getCookie } from 'cookies-next';
import AppContext from '../components/AppContext';
import { useEffect, useContext } from "react";
import { checkAuthentication } from '@/utils/checkAuthentication';



export default function Home() {
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

    return(<>
        <h1>Home</h1>
    </>);
}