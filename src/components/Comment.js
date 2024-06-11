import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import commentStyle from './CommentStyles.module.css';
import useVote from './useVote';

export default function Comment({ comment }) {
  const navigate = useNavigate(); 
  const { upvotes, downvotes, userVote, handleVote } = useVote(comment.upvotes, comment.downvotes, comment.id, 'comments');

  const handleCommentClick = () => {
    navigate(`/post/${comment.id}`);
  };

  return (
    <div className={commentStyle.container}>
      <div className={commentStyle.commentHeader}>
        <img src={comment.userAvatar} className={commentStyle.userAvatar}/>
        <p className={commentStyle.username}>@{comment.username}</p>
      </div>
      <hr className={commentStyle.divider} />
      <div className={commentStyle.commentContent}>
        <p>{comment.content}</p>
      </div>
      <div className={commentStyle.postFooter}>
        <div className={commentStyle.postVotes}>
          <button className={commentStyle.upvoteButton} onClick={() => handleVote('upvote')}>⬆</button>
          <span>{comment.upvotes}</span>
        </div>
        <div className={commentStyle.postVotes}>
          <button className={commentStyle.downvoteButton} onClick={() => handleVote('downvote')}>⬇</button>
          <span>{comment.downvotes}</span>
        </div>
        <button className={commentStyle.commentButton} onClick={handleCommentClick}>🗨️</button> 
      </div>
    </div>
  );
}
