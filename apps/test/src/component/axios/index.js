import React, { useEffect, useState } from 'react';
import { asyncFunction } from '@guava/axios';
import Posts from './posts';

const Axios =() => {

  let [posts, setPosts] = useState([]);
  let [error, setError] = useState('');

  useEffect( () => {
    const fetchPosts = async () => {
      try {
        const response = await asyncFunction({
          method: 'GET',
          url: `https://jsonplaceholder.typicode.com/posts`
        })
        setPosts(response.data)
      } catch (error) {
        setError(JSON.stringify(error));
      }
    }
    fetchPosts();
  }, [])

  return (
    <div>Guava Axios
      {
        error && <div>{error}</div>
      }
      <div className="post-wrap">
        <Posts posts={posts} />
      </div>
    </div>
  )
}

export default Axios;