const path = require('path');

module.exports = {
    mode: 'development',
    bail:  true,
    stats: "errors-only",
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
