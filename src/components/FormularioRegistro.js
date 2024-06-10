import Axios from "axios";

import React, { useState } from 'react';
import "./Registro.css"
import GoogleLogo from "../image/Google.png"
import AppleLogo from "../image/Apple.png"
import FacebookLogo from "../image/Facebook.png"


function FormularioRegistro() {
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

    const validarDataNascimento = () => {
        var inputDataNascimento = document.getElementById('input_dataNascimento');
        var dataSelecionada = new Date(inputDataNascimento.value);
        var dataAtual = new Date();
        var dataMinima = new Date(dataAtual.getFullYear() - 18, dataAtual.getMonth(), dataAtual.getDate());

        if (dataSelecionada > dataMinima) {
            alert("Você precisa ter pelo menos 18 anos para prosseguir.");
            inputDataNascimento.value = '';
        } else {
            // Cria um evento simulado com os valores necessários para handleChangeValues
            var event = {
                target: {
                    name: inputDataNascimento.id,
                    value: inputDataNascimento.value
                }
            };
            // Chama a função handleChangeValues com o evento simulado
            handleChangeValues(event);
        }
    };



    return (

        <div >
            <form onSubmit={handleSubmit} className="login-form" id="formulario_geral">
                <div id="Formulario">
                    <h2 id="Formulario_titulo">Seja  Bem Vindo</h2>
                    <div id="meio_questionario">
                        <div class="div_dupla">
                            <div>
                                <label htmlFor="input_nome" id="nome_texto">Nome:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="input_nome"
                                    name="input_nome"
                                    onChange={handleChangeValues}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="input_sobreNome" id="sobreNome_texto">Sobre Nome:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="input_sobreNome"
                                    name="input_sobreNome"
                                    onChange={handleChangeValues}
                                    required
                                />
                            </div>
                        </div>
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
                        </div>
                        <div class="div_dupla">
                            <div>
                                <label htmlFor="input_dataNascimento" id="dataNascimento_texto">Data de Nascimento:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="input_dataNascimento"
                                    name="input_dataNascimento"
                                    onChange={validarDataNascimento}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="input_genero" id="genero_texto">Genero:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="input_genero"
                                    name="input_genero"
                                    onChange={handleChangeValues}
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
                        <hr className="line" /><a href="conta"><p>Possuo uma conta</p></a><hr className="line" />
                    </div>
                    
                </div>
            </form>
        </div>

    );
}


export default FormularioRegistro
