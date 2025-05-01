import CommentList from '@/components/CommentList';
import React, { useEffect, useState } from 'react';
import { Comment } from '../types';

const useFetchComments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Comment | undefined>(undefined);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // todo: use later accNumber
    const fetchAccountData = async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/comments`
        );
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        console.log('there has been an error retrieving acounts', error);
      }
    };
    fetchAccountData();
  }, []);

  return {
    isLoading,
    data,
    isError
  };
};

const CommentsPage: React.FC = () => {
  const { isLoading, data } = useFetchComments();

  console.log('>> comments', isLoading, data);
  if (isLoading) {
    return <div>...loading</div>;
  }

  if (Array.isArray(data)) {
    return <CommentList items={data} />;
  }
};

export default CommentsPage;
