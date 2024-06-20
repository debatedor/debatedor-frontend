import Axios from "axios";
import React, { useState } from 'react';
import "./Registration.css"
import GoogleLogo from "../../image/Google.png"
import AppleLogo from "../../image/Apple.png"
import FacebookLogo from "../../image/Facebook.png"
import { tokenManager } from "../../http/auth/TokenManager";

function Registration() {
    const [values, setValues] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        birthday: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        Axios.post("http://localhost:3131/users", values)
            .then((response) => {
                console.log(values.birthday)
                console.log(response); // Exiba a resposta da solicitação no console.
                if (response.status === 201) {
                    alert("Usuario cadastrado com sucesso!")
                    localStorage.setItem('loggedUser', JSON.stringify(response.data.user));
                    window.location.href = '/';
                    tokenManager.setToken(response.data.access_token)
                } else {
                    // Handle registration error
                    console.error("Registration failed:", response.data.errors);                   
                }
            })
            .catch((error) => {
                console.error("There was an error with the registration request:", error.response.data.errors);
                alert(error.response.data.errors.reduce((accumulator, currentValue) => accumulator + '- ' + currentValue.message + '\n', ""))
            });
    };

    const handleChangeValues = (event) => {
        // Use a função de atualização do estado para garantir que os valores antigos sejam preservados.
        setValues(prevValue => ({
            ...prevValue, // Mantém os valores antigos do objeto.
            [event.target.name]: event.target.value, // Atualiza o campo correspondente com o novo valor.
        }));
    };

    const validarDataNascimento = (event) => {
        var inputDataNascimento = event.target;
        var dataSelecionada = new Date(inputDataNascimento.value);
        var dataAtual = new Date();
        var dataMinima = new Date(dataAtual.getFullYear() - 18, dataAtual.getMonth(), dataAtual.getDate());

        if (dataSelecionada > dataMinima) {
            alert("Você precisa ter pelo menos 18 anos para prosseguir.");
            inputDataNascimento.value = '';
        } else {
            handleChangeValues(event);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="login-form" id="formulario_geral">
                <div id="Formulario_Registro">
                    <h2 id="Formulario_titulo">Seja  Bem Vindo</h2>
                    <div id="meio_questionario">
                        <div className="div_dupla">
                            <div>
                                <label htmlFor="nome" id="nome_texto">Nome:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nome"
                                    name="name"
                                    onChange={handleChangeValues}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="sobreNome" id="sobreNome_texto">Sobrenome:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="sobreNome"
                                    name="lastname"
                                    onChange={handleChangeValues}
                                    required
                                />
                            </div>
                        </div>
                        <div id="div_gmail">
                            <label htmlFor="gmail" id="gmail_texto">E-mail:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="gmail"
                                name="email"
                                onChange={handleChangeValues}
                                required
                            />
                        </div>
                        <div id="div_senha">
                            <label htmlFor="senha" id="senha_texto">Senha:</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="password"
                                onChange={handleChangeValues}
                                required
                            />
                        </div>
                        <div className="div_dupla">
                            <div>
                                <label htmlFor="dataNascimento" id="dataNascimento_texto">Data de Nascimento:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="dataNascimento"
                                    name="birthday"
                                    onChange={validarDataNascimento}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" id="butao_criar">Criar</button>
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
                        <hr className="line" /><a href="/"><p>Possuo uma conta</p></a><hr className="line" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Registration;
