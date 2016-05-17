import React from 'react';
import Header from './Header';
import Main from './Main';

let method = 'wall.search';
let options = {
    owner_id: 5461421,
    count: 1,
    query: 'Унґвар'
};
let post = {};

function success(e) {
    let data = e.response[1];
    post.text = data.text;
    let userId = data.from_id;
    new Promise((resolve, reject) => {
        let method = 'users.get';
        let options = {
            user_ids: userId,
            fields: 'quotes'
        };
        VK.Api.call(method, options, (e) => {
            post.user = e.response[0].first_name + ' ' + e.response[0].last_name;
            post.text = e.response[0].quotes;
            console.log(e.response);
        });
    }).then(
        console.log('Done!')
    );
}

VK.Api.call(method, options, success);


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

setTimeout(() => {React.render(<App post={post} />, document.getElementById('ebanyj-react'))}, 1000);
