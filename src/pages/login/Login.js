import React, { useState } from 'react';
import Axios from 'axios';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import GoogleLogo from "../../image/Google.png"
import FacebookLogo from "../../image/Facebook.png"
import AppleLogo from "../../image/Apple.png"
import { tokenManager } from '../../http/auth/TokenManager';

function Login() {
    const [values, setValues] = useState({ email: '', password: '' });
    const navigate = useNavigate(); // updated the variable name to 'navigate' to follow conventions

    const handleSubmit = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:3131/sessions", {
            email: values.email,
            password: values.password
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                tokenManager.setToken(response.data.access_token)
                // Save user info to localStorage
                localStorage.setItem('loggedUser', JSON.stringify(response.data.user));
                // Redirect to user page
                navigate('/'); // use 'navigate' to redirect
            } else {
                // Handle login error
                console.error("Login failed:", response.data.message);
                alert(response.data.message)
                
            }
        }).catch((error) => {
            console.error("There was an error with the login request:", error);
            
            alert(error.response.data.errors.reduce((accumulator, currentValue) => accumulator + '- ' + currentValue.message + '\n', ""))

        });
    };

    const handleChangeValues = (event) => {
        setValues(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.value
        }));
    };

    return (
        <div>
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
                                name="email"
                                onChange={handleChangeValues}
                                required
                            />
                        </div>
                        <div id="div_senha">
                            <label htmlFor="input_senha" id="senha_texto">Senha:</label>
                            <input
                                type="password"
                                name="password"
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
                    <div id="imagens_div">
                        <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="logo_link">
                            <img src={GoogleLogo} alt="Google Logo" className="logo" />
                        </a>
                        <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="logo_link">
                            <img src={AppleLogo} alt="Apple Logo" className="logo" />
                        </a>
                        <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="logo_link">
                            <img src={FacebookLogo} alt="Facebook Logo" className="logo" />
                        </a>
                    </div>
                    <div id="cadastro">
                        <hr className="line" /><a href="Registro"><p>Não Possuo Cadastro</p></a><hr className="line" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
