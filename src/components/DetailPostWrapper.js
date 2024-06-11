import React from 'react';
import { useParams } from 'react-router-dom';
import DetailPost from './DetailPost';

export default function DetailPostWrapper() {
  const { id } = useParams();
  return <DetailPost postId={id} />;
}
