// const webpack = require('webpack');
// module.exports = function override(config) {
//     const fallback = config.resolve.fallback || {};
//     Object.assign(fallback, {
//         "crypto": require.resolve("crypto-browserify"),
//         "stream": require.resolve("stream-browserify"),
//         "assert": require.resolve("assert"),
//         "http": require.resolve("stream-http"),
//         "https": require.resolve("https-browserify"),
//         "os": require.resolve("os-browserify"),
//         "url": require.resolve("url")
//     })
//     config.resolve.fallback = fallback;
//     config.plugins = (config.plugins || []).concat([
//         new webpack.ProvidePlugin({
//             process: 'process/browser',
//             Buffer: ['buffer', 'Buffer']
//         })
//     ])
//     return config;
// }

// const webpack = require("webpack");
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

// module.exports = {

//     webpack: {
//         configure: {
//             resolve: {
//                 fallback: {
//                     process: require.resolve("process/browser"),
//                     stream: require.resolve("stream-browserify"),
//                     util: require.resolve("util"),
//                     buffer: require.resolve("buffer"),
//                     asset: require.resolve("assert"),
//                     os: require.resolve('browserify-os'),
//                 },
//             },
//             plugins: [
//                 new webpack.ProvidePlugin({
//                     Buffer: ["buffer", "Buffer"],
//                     process: "process/browser.js",
//                 }),
//                 new NodePolyfillPlugin(),
//             ],

//         },

//     },

// };

/** Found working solution for Webpack < 5 polyfill issue
 * 
 * 1. Install the react-app-rewired package
 *    npm install--save - dev react - app - rewired
 * 
 * 2. Install missing dependencies:
 * npm install--save - dev crypto - browserify stream - browserify assert stream - http https - browserify os - browserify url buffer process
 * 
 * 3. Create a config - overrides.js file in the root of your project
 * 
 * 4. Add the code below to the config - overrides.js file
 * 
 * const webpack = require('webpack');
 * module.exports = function override(config) {
 *    const fallback = config.resolve.fallback || {};
 *    ....
 * 
 * 5. Override the start script with the following code in your package.json file:
 * 
 *  "scripts": {
 *     "start": "react-app-rewired start", 
 *    "build": "react-app-rewired build",   
 *   "test": "react-app-rewired test",
 * },
 * 
 *  6. Run the app with npm start
 * 
 *  Complete solution can be found here:
 *  https: //docs.x.immutable.com/docs/create-react-app-webpack-5-errors/ 
 */



const webpack = require('webpack');
module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url")
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    config.module.rules.push({
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        }
    })
    return config;
}