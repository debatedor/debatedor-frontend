import Axios from "axios";
import "./Login.css"
import React, { useState } from 'react';
import"./Login.css"


function Formulario(){
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
        
        <form onSubmit={handleSubmit} className="login-form">
            <div id = "Formulario">
                <label htmlFor="gmail">gmail de Usuário:</label>
                <input
                    type="text"
                    className="form-control"
                    id="gmail"
                    name='gmail'
                    onChange={handleChangeValues}
                    required
                />
            
            <div>
                <label htmlFor="senha">Senha:</label>
                <input
                    type="text"
                    name='senha'
                    className="form-control"
                    id="senha"
                    onChange={handleChangeValues}
                    required
                />
            </div>
            <button type="submit">Entrar</button>
            </div>
        </form>
  
    );
}


export default Formulario