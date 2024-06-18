import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DetailPostStyles.module.css';

export default function PostCard({ post, handleEdit, handleDelete, handleVote, upvotes, downvotes }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.postCard} onClick={handleCardClick}>
        <div className={styles.postHeader}>
          <div className={styles.postUserInfo}>
            <img src={post.userAva} className={styles.userAvatar} />
            <button className={styles.userNameButton} onClick={(e) => e.stopPropagation()}>
              @{post.username}
            </button>
          </div>
          <div className={styles.postDate}>
            <p>Postado em {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
          <div className={styles.menuContainer}>
            <button className={styles.menuButton} onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}>...</button>
            {menuOpen && (
              <div className={styles.menu}>
                <button onClick={(e) => { e.stopPropagation(); handleEdit(); }}>Editar</button>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(); }}>Excluir</button>
              </div>
            )}
          </div>
        </div>
        <hr className={styles.divider} />
        <h3 className={styles.postTitle}>{post.title}</h3>
        <a href={post.source} className={styles.postLink} onClick={(e) => e.stopPropagation()}>{post.source}</a>
        <p className={styles.postContent}>{post.description}</p>
        <h1 className={styles.postContent}>{post.question}</h1>
        <div className={styles.postFooter}>
          <div className={styles.postVotes}>
            <button className={styles.upvoteButton} onClick={(e) => { e.stopPropagation(); handleVote('upvote'); }}>⬆</button>
            <span>{upvotes}</span>
          </div>
          <div className={styles.postVotes}>
            <button className={styles.downvoteButton} onClick={(e) => { e.stopPropagation(); handleVote('downvote'); }}>⬇</button>
            <span>{downvotes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
