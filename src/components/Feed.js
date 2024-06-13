import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { fakePosts } from './fakePosts';
import { useNavigate } from "react-router-dom";
import Style from  "./Post.css"
import PostCard from "./PostCard";
import { context } from "../context";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [values, setValues] = useState({source: '', description: '', question: ''});
    const navigate = useNavigate();

    const config = {
        headers: { Authorization: `Bearer ${context.getAccessToken()}` }
    } 

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(context.getAccessToken())
        Axios.post("http://localhost:3131/create-post", {
            source: values.source,
            description: values.description,
            question: values.question
        }, config).then((response) => {
            console.log(response.data.errors);
        });
    };

    const handleChange = (value) => {
        setValues(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    };

    const handleVote = (postId, type) => {
        // lógica para manipular votos
        console.log(`Post ${postId} votado: ${type}`);
    };

    const handleEdit = (postId) => {
        console.log(`Editar post ${postId}`);
    };

    const handleDelete = (postId) => {
        console.log(`Excluir post ${postId}`);
    };

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await Axios.get(`http://localhost:3131/posts`);
            setPosts(response.data);
          } catch (error) {
            console.error('Erro ao buscar detalhes da postagem:', error);

            // Pega dados falsos
            console.log("antes");
            setPosts(fakePosts); // Assumindo que fakePosts é um array de posts
            console.log("durante");
          }
        };
        fetchPost();
    }, []);

    return (
        <div id="Feed">
            <form id="Post" className="Publique" onSubmit={handleSubmit}>
                <section>
                    <h2>Publique sua notícia & receba argumentos</h2>
                    <div>
                        <div>
                            <h3>Link notícia</h3>
                            <input type="text" className="inputUser" id="linkNoticia" name="linkNoticia" onChange={handleChange} />
                        </div>
                        <div>
                            <h3>Descrição</h3>
                            <textarea type="text" className="inputUser" id="description" name="description" onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <h3>Pergunta de sim ou não</h3>
                            <input type="text" className="inputUser" id="question" name="question" onChange={handleChange} />
                        </div>
                    </div>
                </section>
                <button type="submit">Publicar</button>
            </form>

            <div className={Style.divider}></div>

            <div className={Style.noticias}>
                {Array.isArray(posts) && posts.map(post => (
                    <PostCard
                        key={post.id}
                        post={post}
                        handleEdit={() => handleEdit(post.id)}
                        handleDelete={() => handleDelete(post.id)}
                        handleVote={(type) => handleVote(post.id, type)}
                        upvotes={post.upvotes}
                        downvotes={post.downvotes}
                    />
                ))}
            </div>
        </div>
    );
}
