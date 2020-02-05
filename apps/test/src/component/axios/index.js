import React, { useEffect, useState } from 'react';
import { asyncFunction } from '@guava/axios';
import Posts from './posts';

const Axios =() => {

  let [posts, setPosts] = useState([]);
 
  useEffect( () => {
    const fetchPosts = async () => {
      const [, res] = await asyncFunction({
        method: 'GET',
        url: `https://jsonplaceholder.typicode.com/posts`
      })
      console.log(res, "OKOK")
      debugger
      setPosts(res)
    }
    fetchPosts();
  }, [])

  return (
    <div>Guava Axios
      <Posts posts={posts} />
    </div>
  )
}

export default Axios;