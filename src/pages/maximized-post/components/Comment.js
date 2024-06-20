import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import commentStyle from './CommentStyles.module.css';
import useVote from '../utils/useVote';

export default function Comment({ comment }) {
  const navigate = useNavigate(); 
  const { upvotes, downvotes, userVote, handleVote } = useVote(comment.upvotes, comment.downvotes, comment.id, 'comments');

  const handleCommentClick = () => {
    navigate(`/post/:id`);
  };

  return (
    <div className={commentStyle.container}>
      <div className={commentStyle.commentHeader}>
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
      </div>
    </div>
  );
}
