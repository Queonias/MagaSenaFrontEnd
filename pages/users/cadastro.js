import styles from '../../styles/cadastro.module.css';
import { useState, useContext } from 'react';
import AppConext from "../../components/AppContext";
import Link from 'next/link';
import { setCookie } from 'cookies-next';
import { requestPost } from '../../service/requests';
import { useRouter } from 'next/router';

export default function Cadastro() {
    const router = useRouter();
    const [Error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleNameChange = (e) => {
        e.preventDefault();
        const key = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [key]: value });
    }

    const handleForm = async (event) => {
        try {
          event.preventDefault();
          const { data } = await requestPost('/user/signup', formData);
          setCookie('authorization', data.token);
          router.push('/apostas');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
                console.log(err.response.data.error);
              } else {
                setError("An error occurred");
                console.log('errrsa', err);;
              }
        }
      };
      

    return (
    <div className={ `container ${ styles.cadastro }` }>
        <form onSubmit={ handleForm }>
            <div className={ `${styles.title}` }>
                <h3>Crie sua conta</h3>
            </div>
            <div>
                <label for="autoSizingInput" className="form-label">Seu nome</label>
                <input type="text" className="form-control" id="exampleInput" value={ formData.name } onChange={ (e) => handleNameChange(e) } name="name"/>
            </div>
            <div>
                <label for="exampleInputEmail1" className="form-label">Seu e-mail</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={ formData.email } onChange={ (e) => handleNameChange(e) } name="email"/>
            </div>
            <div>
                <label for="exampleInputPassword1" className="form-label">Sua senha</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={ formData.password } onChange={ (e) => handleNameChange(e) } name="password"/>
            </div>
            <div className={ styles.button_container }>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </div>
            { Error && <p className={styles.error}>{ Error }</p> }
            <Link href="/users/login">Já possui conta?</Link>
        </form>
  </div>
    )
}