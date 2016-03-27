import React from 'react';

class Post extends React.Component {
    render() {
        return (
            <div className="page__wrap">{this.props.post.user}: {this.props.post.text}</div>
        )
    }
}

export default Post;
