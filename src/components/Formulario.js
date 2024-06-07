import Axios from "axios";
import "./Login.css"
import React, { useState } from 'react';
import "./Login.css"


function Formulario() {
    const [values, setValues] = useState({ gmail: '', senha: '' });
    const [gmail, setGmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:3001/register", {
            gmail: values.gmail,
            senha: values.senha
        }).then((response) => {
            console.log(response); // Exiba a resposta da solicitação no console.
        })
    };

    const handleChangeValues = (value) => {
        // Use a função de atualização do estado para garantir que os valores antigos sejam preservados.
        setValues(prevValue => ({
            ...prevValue, // Mantém os valores antigos do objeto.
            [value.target.name]: value.target.value, // Atualiza o campo correspondente com o novo valor.
        }))
    };



    return (

        <form onSubmit={handleSubmit} className="login-form" id="formulario_geral">
            <div id="Formulario">
                <h2 id="Formulario_titulo">Bem Vindo de Volta </h2>
                <div id="meio_questionario">
                    <div>
                        <label htmlFor="gmail_texto">Gmail de Usuário:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="gmail"
                            name='gmail'
                            onChange={handleChangeValues}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="senha_texto">Senha:</label>
                        <input
                            type="text"
                            name='senha'
                            className="form-control"
                            id="senha"
                            onChange={handleChangeValues}
                            required
                        />
                    </div>
                </div>
                <button type="submit" id="butao_enviar" >Continuar</button>
            </div>
        </form>

    );
}


export default Formulario