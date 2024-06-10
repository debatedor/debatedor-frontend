import Axios from "axios";
import "./Login.css"
import React, { useState } from 'react';
import GoogleLogo from "../image/Google.png"
import AppleLogo from "../image/Apple.png"
import FacebookLogo from "../image/Facebook.png"


function FormularioLogin() {
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

        <div >
            <form onSubmit={handleSubmit} className="login-form" id="formulario_geral">
                <div id="Formulario">
                    <h2 id="Formulario_titulo">Bem Vindo de Volta</h2>
                    <div id="meio_questionario">
                        <div id="div_gmail">
                            <label htmlFor="input_gmail" id="gmail_texto">Gmail de Usuário:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="input_gmail"
                                name="input_gmail"
                                onChange={handleChangeValues}
                                required
                            />
                        </div>
                        <div id="div_senha">
                            <label htmlFor="input_senha" id="senha_texto">Senha:</label>
                            <input
                                type="password"
                                name="input_senha"
                                className="form-control"
                                id="input_senha"
                                onChange={handleChangeValues}
                                required
                            />
                            <p id="esqueceu_senha"><a href="url">Esqueceu a senha?</a></p>
                        </div>
                    </div>
                    <button type="submit" id="butao_enviar">Continuar</button>
                    <div id="continue">
                        <hr className="line" /><p>Ou Continue Com</p><hr className="line" />
                    </div>
                    <div id= "imagens_div">
                        <a href="https://example.com" target="_blank" rel="noopener noreferrer" class="logo_link">
                            <img src={GoogleLogo} alt="Google Logo" class="logo" />
                        </a>
                        <a href="https://example.com" target="_blank" rel="noopener noreferrer" class="logo_link">
                            <img src={AppleLogo} alt="Apple Logo" class="logo" />
                        </a>
                        <a href="https://example.com" target="_blank" rel="noopener noreferrer" class="logo_link">
                            <img src={FacebookLogo} alt="Facebook Logo" class="logo" />
                        </a>
                    </div>
                    <div id="cadastro">
                        <hr className="line" /><a href="cada"><p>Nao Possuo Cadastro</p></a><hr className="line" />
                    </div>

                </div>
            </form>
        </div>

    );
}


export default FormularioLogin