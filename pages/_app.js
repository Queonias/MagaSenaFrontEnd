import '@/styles/globals.css'
import Layout from '@/components/Layout'
import { useState, useEffect } from "react";
import AppContext from "../components/AppContext";

export default function App({ Component, pageProps }) {
  const [errosContext, setErrorsContext] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  return (
    <AppContext.Provider value={ { errosContext, setErrorsContext, setisLoggedIn, isLoggedIn } }>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider> 
    )
}
