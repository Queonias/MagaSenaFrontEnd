import styles from '../../styles/login.module.css';
import { useState } from 'react';
import Link from 'next/link';

export default function Cadastro() {
    const [formDate, setFormDate] = useState({
        email: '',
        password: ''
    });

    const handleNameChange = (e) => {
        e.preventDefault();
        const key = e.target.name;
        const value = e.target.value;
        setFormDate({ ...formDate, [key]: value });
    }

    const handleForm = (e) => {
        e.preventDefault();
    }

    return (
        <div className={ `container ${ styles.login }` }>
            <form onSubmit={ handleForm }>
                <div className={ `${styles.title}` }>
                    <h3>Entre em sua conta</h3>
                </div>
                <div>
                    <label for="exampleInputEmail1" className="form-label" value={ formDate.email } onChange={ (e) => handleNameChange(e) } name="email">Seu e-mail</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div>
                    <label for="exampleInputPassword1" className="form-label">Sua senha</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={ formDate.password } onChange={ (e) => handleNameChange(e) } name="password"/>
                </div>
                <div className={ styles.button_container }>
                    <button type="submit" className="btn btn-primary">Entrar</button>
                </div>
                <Link href="/users/cadastro">Não possui conta?</Link>
        </form>
      </div>
    )
}
