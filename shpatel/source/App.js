import React from 'react';
import Header from './Header';
import Main from './Main';

let post = {
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at consequuntur culpa deserunt esse ex facere fugit illo laboriosam laborum maxime quam quo ratione sapiente, suscipit! A earum impedit molestiae.',
        user: 'Джага Джагер'
    };

class App extends React.Component {
    render() {
        return(
            <div>
                <Header />
                <Main post={this.props.post} />
            </div>
        )
    }
}

React.render(<App post={post} />, document.getElementById('ebanyj-react'));
