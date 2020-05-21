import React, { Component } from 'react'
import PostItem from './PostItem';
import { PropTypes } from 'prop-types';

class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    if (posts !== null) {
      return posts.map(post => <PostItem key={post._id} post={post} />)
    }
    else {
      return (
        <div>
          <h1>什么也没有说！</h1>
        </div>
      )
    }
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostFeed;