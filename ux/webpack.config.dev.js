const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// return a function from the config file
// the `env` variable will be a simple Object: { API_URL: 'http://localhost:8000' }
// it will contain all the environment variables (that we set in package.json) as key/value pairs
module.exports = (env) => {
    // Get the root path (assuming your webpack config is in the root of your project!)
    const currentPath = path.join(__dirname);

    // Create the fallback path (the production .env)
    const basePath = currentPath + '/.env';

    // We're concatenating the environment name to our filename to specify the correct env file!
    const envPath = basePath + '.' + env.ENVIRONMENT;

    // Check if the file exists, otherwise fall back to the production .env
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;

    // Set the path parameter in the dotenv config
    const fileEnv = dotenv.config({ path: finalPath }).parsed;

    // create a nice object from the env variable
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});

    return {
        plugins: [
            new webpack.DefinePlugin(envKeys)
        ],
        mode: env.ENVIRONMENT,
        watch: true,
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                  },
            ]
        }
    };
};