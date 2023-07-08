import styles from '../../styles/cadastro.module.css';
import { useState } from 'react';
import Link from 'next/link';

export default function Cadastro() {
    const [formDate, setFormDate] = useState({
        name: '',
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
    <div className={ `container ${ styles.cadastro }` }>
        <form onSubmit={ handleForm }>
            <div className={ `${styles.title}` }>
                <h3>Crie sua conta</h3>
            </div>
            <div>
                <label for="autoSizingInput" className="form-label">Seu nome</label>
                <input type="text" className="form-control" id="exampleInput" value={ formDate.name } onChange={ (e) => handleNameChange(e) } name="name"/>
            </div>
            <div>
                <label for="exampleInputEmail1" className="form-label">Seu e-mail</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={ formDate.email } onChange={ (e) => handleNameChange(e) } name="email"/>
            </div>
            <div>
                <label for="exampleInputPassword1" className="form-label">Sua senha</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={ formDate.password } onChange={ (e) => handleNameChange(e) } name="password"/>
            </div>
            <div className={ styles.button_container }>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </div>
            <Link href="/users/login">Já possui conta?</Link>
        </form>
  </div>
    )
}