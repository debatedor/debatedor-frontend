import React, { useEffect, useState } from 'react';
import styles from './DetailPostStyles.module.css';
import axios from 'axios';
import { fakePosts } from './fakePosts';
import Comment from './Comment';
import useVote from './useVote';

export default function DetailPost({ postId }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async (postId) => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${postId}`);
        setPost(response.data);
        // Obter os comentários relacionados à postagem
        const commentsResponse = await axios.get(`http://localhost:3001/posts/${postId}/comments`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes da postagem:', error);
  
        // Se a postagem não for encontrada, carregar uma fake
        const fakePost = fakePosts.find(p => p.id === parseInt(postId));
        if (fakePost) {
          setPost(fakePost);
          setComments([fakePost]); // Limpa os comentários
        } else {
          console.error('Postagem falsa não encontrada para o ID:', postId);
        }
      }
    };
    fetchPost(postId);
  }, [postId]);

  const { upvotes, downvotes, userVote, handleVote } = useVote(post?.upvotes || 0, post?.downvotes || 0, postId, 'posts');

  if (!post) {
    return <div>404</div>;
  }

  return (
    <div className={styles.mainContainer}>
     <div className={styles.postCard}>
      <div className={styles.postHeader}>
        <div className={styles.postUserInfo}>
          <img src={post.userAvatar} className={styles.userAvatar}/>
          <div>
            <h4>@{post.username}</h4>
          </div>
        </div>
        <div className={styles.postDate}>
          <p>Postado em {new Date(post.date).toLocaleDateString()}</p>
        </div>
      </div>
      <hr className={styles.divider} />
      <h3 className={styles.postTitle}>{post.title}</h3>
      <a href={post.link} className={styles.postLink}>{post.link}</a>
      <p className={styles.postContent}>{post.content}</p>
      <div className={styles.postFooter}>
        <div className={styles.postVotes}>
          <button className={styles.upvoteButton} onClick={() => handleVote('upvote')}>⬆</button>
          <span>{upvotes}</span>
        </div>
        <div className={styles.postVotes}>
          <button className={styles.downvoteButton} onClick={() => handleVote('downvote')}>⬇</button>
          <span>{downvotes}</span>
        </div>
      </div>
    </div>

    <div className={styles.commentCard}>
      {Array.isArray(comments) && comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>

    </div>
  );
}
