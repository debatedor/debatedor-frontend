import React, { useEffect, useState } from 'react';
import styles from './MaximizedPostStyles.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Comment from './Comment';
import useVote from '../utils/useVote';
import PostCard from '../../feed/components/PostCard';
import { authorizationConfig } from '../../../http/auth/authorization-configuration';

export default function DetailPost({ postId }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newComment, setNewComment] = useState({ argument: '', position: ''});
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
          id: response.data.id,
          publisher: response.data.publisher,
          question: response.data.question,
          description: response.data.description,
          source: response.data.source,
          createdAt: response.data.createdAt
        });

        setComments(response.data.comments);
        console.log(comments)

      } catch (error) {
        console.error('Erro ao buscar detalhes da postagem:', error);
      }
    };
    fetchPost();
  }, [postId]);

  // const handleEdit = () => {
  //   console.log('Edit action');
  // };

  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(`http://localhost:3001/posts/${postId}`);
  //     handleCommentClick();
  //     console.log('Delete action');
  //   } catch (error) {
  //     console.error('Erro ao deletar a postagem:', error);
  //   }
  // };

  const handleCommentChange = (value) => {
      setNewComment(prevValue => ({
        ...prevValue,
        [value.target.name]: value.target.value,
    }));
};

  const handleCommentSubmit = async () => {
    console.log(newComment)
    // if (!newComment.argument.trim()) {
    //   return;
    // }
    try {
      await axios.post(`http://localhost:3131/create-comment`, {
        argument: newComment.argument,
        // position: newComment.position
        postId
      },
      authorizationConfig
    );
      // const commentsResponse = await axios.get(`http://localhost:3001/posts/${postId}/comments`);
      // setComments(commentsResponse.data);
    } catch (error) {
      console.error('Erro ao enviar o comentário:', error);
      if(error.response.data.errors){
        alert(error.response.data.errors.reduce((accumulator, currentValue) => accumulator + '- ' + currentValue.message + '\n', ""))
      }
      if(error.response.status === 401) {
        alert('Você não está autenticado')
      }
    }
    setNewComment({argument:'', position:''}); // Limpar o campo de comentário

  };

  if (!post) {
    return <div>404</div>;
  }
  return (
    <div className={styles.mainContainer}>
      <PostCard
        post={post}
        // handleEdit={handleEdit}
        // handleDelete={handleDelete}
        // handleVote={handleVote}
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
            name='argument'
            value={newComment.argument}
            onChange={handleCommentChange}
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

          <div className={styles.noticias}>Comentários</div>
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
