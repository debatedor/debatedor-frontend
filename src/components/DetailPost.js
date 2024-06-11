import React, { useEffect, useState } from 'react';
import styles from './DetailPostStyles.module.css';
import axios from 'axios';
import { fakePosts } from './fakePosts';
import { useNavigate } from 'react-router-dom';
import Comment from './Comment';
import useVote from './useVote';

export default function DetailPost({ postId }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  const handleCommentClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchPost = async (postId) => {
      try {
        const response = await axios.get(`http://localhost:3001/posts/${postId}`);
        setPost(response.data);

        const commentsResponse = await axios.get(`http://localhost:3001/posts/${postId}/comments`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes da postagem:', error);
        const fakePost = fakePosts.find(p => p.id === parseInt(postId));
        if (fakePost) {
          setPost(fakePost);
          setComments([fakePost]);
        } else {
          console.error('Postagem falsa não encontrada para o ID:', postId);
        }
      }
    };
    fetchPost(postId);
  }, [postId]);

  const { upvotes, downvotes, userVote, handleVote } = useVote(post?.upvotes || 0, post?.downvotes || 0, postId, 'posts');

  const handleEdit = () => {
    console.log('Edit action');
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/posts/${postId}`);
      handleCommentClick();
      console.log('Delete action');
    } catch (error) {
      console.error('Erro ao deletar a postagem:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      return;
    }
    try {
      await axios.post(`http://localhost:3001/posts/${postId}/comments`, {
        content: newComment,
      });
      setNewComment(''); // Limpar o campo de comentário
      const commentsResponse = await axios.get(`http://localhost:3001/posts/${postId}/comments`);
      setComments(commentsResponse.data);
    } catch (error) {
      console.error('Erro ao enviar o comentário:', error);
    }
    setNewComment('');
  };

  if (!post) {
    return <div>404</div>;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.postCard}>
        <div className={styles.postHeader}>
          <div className={styles.postUserInfo}>
            <img src={post.userAvatar} className={styles.userAvatar} />
              <button className={styles.userNameButton} onClick={() => {}}>
                @{post.username}
              </button>
          </div>
          <div className={styles.postDate}>
            <p>Postado em {new Date(post.date).toLocaleDateString()}</p>
          </div>
          <div className={styles.menuContainer}>
            <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>...</button>
            {menuOpen && (
              <div className={styles.menu}>
                <button onClick={handleEdit}>Editar</button>
                <button onClick={handleDelete}>Excluir</button>
              </div>
            )}
          </div>
        </div>
        <hr className={styles.divider} />
        <h3 className={styles.postTitle}>{post.title}</h3>
        <a href={post.link} className={styles.postLink}>{post.link}</a>
        <p className={styles.postContent}>{post.content}</p>
        <div className={styles.postFooter}>
          <div className={styles.postVotes}>
            <button className={styles.upvoteButton} onClick={() => handleVote('upvote')}>⬆</button>
            <span>{post.upvotes}</span>
          </div>
          <div className={styles.postVotes}>
            <button className={styles.downvoteButton} onClick={() => handleVote('downvote')}>⬇</button>
            <span>{post.downvotes}</span>
          </div>
        </div>
      </div>

      <div className={styles.commentSectionMain}>
        <div className={styles.commentSection}>
          <label htmlFor="newComment" className="form-label">Faça um Comentário</label>
          <textarea
            className="form-control"
            id="newComment"
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={handleCommentSubmit}
          >
            Enviar Comentário
          </button>

          <div className={styles.noticias}>Notícias</div>
            <hr className={styles.divider} />
          </div>
      </div>

      <div className={styles.commentCardLeft}>
        {Array.isArray(comments) && comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>

    </div>
  );
}
