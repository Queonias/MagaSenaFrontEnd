import Link from "next/link";
import style from "../styles/navBar.module.css";
import { useContext } from "react";
import AppContext from "./AppContext";

export default function Navbar() {
  const context = useContext(AppContext);

  const cleanCookie = () => {
    document.cookie = `authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    context.setisLoggedIn(false);
  }
 
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div class="container">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" href="/">
              Mega-Sena
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link className="nav-link" href="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link disabled" href={""}>
                  Disabled
                </Link>
              </li>
            </ul>
            <ul class="navbar-nav ml-auto">
              {context.isLoggedIn && (
                <>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Jogos
                    </a>
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="/apostas">
                          Apostas
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/apostas">
                          Criar Apostas
                        </a>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li onClick={ cleanCookie }>
                        <Link className="dropdown-item" href={"/users/login"}>
                          Sair
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              {!context.isLoggedIn && (
                <>
                  <li class="nav-item">
                    <Link className="nav-link" href={"/users/login"}>
                      Login
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link className="nav-link" href={"/users/cadastro"}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
