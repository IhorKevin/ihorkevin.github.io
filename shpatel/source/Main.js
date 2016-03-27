import React from 'react';
import Buttons from './Buttons';
import Post from './Post';

class Main extends React.Component {
    render() {
        return (
            <main className="page__main">
                <Buttons />
                <Post post={this.props.post}/>
            </main>
        )
    }
}

export default Main;
