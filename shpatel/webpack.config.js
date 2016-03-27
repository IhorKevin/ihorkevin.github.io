module.exports = {
    entry: [
        './source/App.js'
    ],
    output: {
        path: __dirname,
        filename: 'app.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel'
        }]
    }
};
