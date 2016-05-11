import React from 'react';

class Post extends React.Component {

    componentDidMount() {
        let apiUrl = 'http://api.vk.com/method/wall.get?owner_id=-111877258&count=2';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', apiUrl);
        xhr.send();
    }


    render() {
        return (
            <div className="page__wrap">{this.props.post.user}: {this.props.post.text}</div>
        )
    }
}

export default Post;
