import React from 'react';

const Posts = (props) => {
  const { posts } = props;
  return posts.map((post, index) => {
    return (
      <div className="card" key={index}>
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.body}</p>
        </div>
      </div>
    )
  })
}

export default Posts;