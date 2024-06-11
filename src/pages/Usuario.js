import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import "../css/Usuario.css";

function UltimoUsuario() {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        // Fetch user data from localStorage
        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        if (loggedUser) {
            setUsuario(loggedUser);
        }
    }, []);

    const handleDeleteUser = () => {
        if (usuario) {
            Axios.delete(`http://localhost:3131/users/${usuario.id}`)
                .then(response => {
                    localStorage.removeItem('loggedUser');
                    setUsuario(null);
                    // Redirect to login page or another action
                    window.location.href = '/login';
                })
                .catch(error => {
                    console.error("There was an error deleting the user!", error);
                });
        }
    };

    return (
        <div id="Formulario_Registro">
            {usuario ? (
                <>
                    <h1 id="Titulo_Login">{usuario.nome} {usuario.sobreNome}</h1>
                    <div id="user_details">
                        <p>Gmail: {usuario.gmail}</p>
                        <p>Data de Nascimento: {usuario.dataNascimento}</p>
                        <p>Gênero: {usuario.genero}</p>
                        <div id="user_actions">
                            <Link to="/" id="link_sair" onClick={() => localStorage.removeItem('loggedUser')}>
                                <p>Sair</p>
                            </Link>
                            <button id="botao_excluir" onClick={handleDeleteUser}>Excluir Usuário</button>
                        </div>
                    </div>
                </>
            ) : (
                <p>Nenhum usuário logado.</p>
            )}
        </div>
    );
}

export default UltimoUsuario;
