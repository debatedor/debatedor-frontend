import { useState } from 'react';
import axios from 'axios';

export default function useVote(initialUpvotes, initialDownvotes, itemId, itemType){
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState(null);

  const handleVote = async (voteType) => {
    try {
      if (userVote === voteType) {
        await axios.post(`http://localhost:3001/${itemType}/${itemId}/${voteType}`, { undo: true });
        if (voteType === 'upvote') {
          setUpvotes(prev => prev - 1);
        } else {
          setDownvotes(prev => prev - 1);
        }
        setUserVote(null);
      } else {
        const oppositeVoteType = voteType === 'upvote' ? 'downvote' : 'upvote';
        if (userVote === oppositeVoteType) {
          await axios.post(`http://localhost:3001/${itemType}/${itemId}/${oppositeVoteType}`, { undo: true });
          if (oppositeVoteType === 'upvote') {
            setUpvotes(prev => prev - 1);
          } else {
            setDownvotes(prev => prev - 1);
          }
        }
        await axios.post(`http://localhost:3001/${itemType}/${itemId}/${voteType}`);
        if (voteType === 'upvote') {
          setUpvotes(prev => prev + 1);
        } else {
          setDownvotes(prev => prev + 1);
        }
        setUserVote(voteType);
      }
    } catch (error) {
      console.error('Erro ao votar:', error);
    }
  };

  return { upvotes, downvotes, userVote, handleVote };
};
