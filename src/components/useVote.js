import { useState } from 'react';
import axios from 'axios';

export default function useVote(postId) {
  const [userVote, setUserVote] = useState(null);

  const handleVote = async (voteType, setPost) => {
    try {
      if (userVote === voteType) {
        await axios.post(`http://localhost:3001/posts/${postId}/${voteType}`, { undo: true });
        setPost(prevPost => ({
          ...prevPost,
          [voteType + 's']: prevPost[voteType + 's'] - 1,
        }));
        setUserVote(null);
      } else {
        const oppositeVoteType = userVote === 'upvote' ? 'downvote' : 'upvote';
        if (userVote) {
          await axios.post(`http://localhost:3001/posts/${postId}/${oppositeVoteType}`, { undo: true });
          setPost(prevPost => ({
            ...prevPost,
            [oppositeVoteType + 's']: prevPost[oppositeVoteType + 's'] - 1,
            [voteType + 's']: prevPost[voteType + 's'] + 1,
          }));
        } else {
          await axios.post(`http://localhost:3001/posts/${postId}/${voteType}`);
          setPost(prevPost => ({
            ...prevPost,
            [voteType + 's']: prevPost[voteType + 's'] + 1,
          }));
        }
        setUserVote(voteType);
      }
    } catch (error) {
      console.error('Erro ao votar:', error);
    }
  };

  return { userVote, handleVote };
};

