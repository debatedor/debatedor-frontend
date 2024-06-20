import React, { useEffect, useState } from 'react';
import styles from './MaximizedPostStyles.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Comment from './Comment';
import useVote from '../utils/useVote';
import PostCard from '../../feed/components/PostCard';

export default function DetailPost({ postId }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate();

  const { upvotes, downvotes, userVote, handleVote } = useVote(post?.upvotes || 0, post?.downvotes || 0, postId, 'posts');

  const handleCommentClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3131/find-post-by-id/?id=${postId}`);
        setPost({
          question: response.data.title
        });

        setComments(response.data.comments);
      } catch (error) {
        console.error('Erro ao buscar detalhes da postagem:', error);
      }
    };
    fetchPost();
  }, [postId]);

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
      <PostCard
        post={post}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleVote={handleVote}
        upvotes={upvotes}
        downvotes={downvotes}
      />

      <div className={styles.commentSectionMain}>
        <div className={styles.commentSection}>
          <label htmlFor="newComment" className={styles.formLabel}>Faça um Comentário</label>
          <textarea
            className="form-control"
            id="newComment"
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <div className={styles.alignRight}>
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={handleCommentSubmit}
            >
              Enviar Comentário
            </button>
          </div>

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
