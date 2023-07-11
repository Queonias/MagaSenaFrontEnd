import styles from "../../styles/login.module.css";
import { useState } from "react";
import Link from "next/link";
import { setCookie } from "cookies-next";
import { requestPost } from "../../service/requests";
import { useRouter } from 'next/router';
import Alert from "@/components/alert";

export default function Cadastro() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [Error, setError] = useState("");

  const handleNameChange = (e) => {
    e.preventDefault();
    const key = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
  };

  const handleForm = async (event) => {
    try {
      event.preventDefault();
      const { data } = await requestPost("/user/login", formData);
      setCookie("authorization", data.token);
      router.push("/apostas");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <div className="container">
    <Alert />
    <div className={`container ${styles.login}`}>
      <form onSubmit={handleForm}>
        <div className={`${styles.title}`}>
          <h3>Entre em sua conta</h3>
        </div>
        <div>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Seu e-mail
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={formData.email}
            onChange={(e) => handleNameChange(e)}
            name="email"
          />
        </div>
        <div>
          <label htmlFor="exampleInputPassword1" className="form-label">
            Sua senha
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={formData.password}
            onChange={(e) => handleNameChange(e)}
            name="password"
          />
        </div>
        <div className={styles.button_container}>
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
        </div>
        { Error && <p className={ styles.error }>{Error}</p> }
        <Link href="/users/cadastro">Não possui conta?</Link>
      </form>
    </div>
    </div>
  );
}
