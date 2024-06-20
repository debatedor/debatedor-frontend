import React from 'react';
import { useParams } from 'react-router-dom';
import MaximizedPost from './components/MaximizedPost';

export default function MaximizedPostWrapper() {
  const { id } = useParams();
  return <MaximizedPost postId={id} />;
}
