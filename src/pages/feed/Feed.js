import Axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Style from  "./Feed.css"
import PostCard from "./components/PostCard";
import PostForm from "./components/PostForm";

export default function Feed() {
    const [posts, setPosts] = useState([]);

    const fetchPost = async () => {
          try {
            const response = await Axios.get(`http://localhost:3131/posts`);
            setPosts(response.data);
            console.log(response.data)
          } catch (error) {
            console.error('Erro ao buscar detalhes da postagem:', error);
          }
        };

    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <div id="Feed">

            <PostForm/>
            
            <div className={Style.divider}></div>

            <div className={Style.noticias}>
                {Array.isArray(posts) && posts.map(post => (
                    <PostCard
                        key={post.id}
                        post={post}
                        // handleEdit={() => handleEdit(post.id)}
                        // handleDelete={() => handleDelete(post.id)}
                        // handleVote={(type) => handleVote(post.id, type)}
                        upvotes={post.upvotes}
                        downvotes={post.downvotes}
                    />
                ))}
            </div>
        </div>
    );
}
