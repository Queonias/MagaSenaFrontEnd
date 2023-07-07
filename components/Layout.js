import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./NavBar";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>MegaSenaApp</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossorigin="anonymous"
        ></link>
      </Head>
      <Navbar />
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">{children}</main>
        <Footer />
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossorigin="anonymous"
      ></script>
    </>
  );
}
