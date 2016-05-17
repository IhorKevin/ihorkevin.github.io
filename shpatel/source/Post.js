import React from 'react';

class Post extends React.Component {

    // componentDidMount() {
    //     let apiUrl = 'http://api.vk.com/method/wall.get?owner_id=-111877258&count=2';
    //     let xhr = new XMLHttpRequest();
    //
    //
    //     let getData = new Promise((resolve, reject) => {
    //         xhr.open('GET', apiUrl);
    //         xhr.send();
    //     })
    //
    //     getData().then((res) => {
    //         console.log(res);
    //     })
    //
    // }


    render() {
        return (
            <div className="page__wrap">
                <div className="post">
                    <span className="post__author">{this.props.post.user}</span>: {this.props.post.text}
                </div>
            </div>
        )
    }
}

export default Post;
