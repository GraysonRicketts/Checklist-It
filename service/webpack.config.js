const path = require('path');
var glob = require("glob");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 600,
        ignored: ['node_modules/**']
    },
    mode: "development"
};