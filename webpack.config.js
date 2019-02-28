const serverConfig = require('./webpack.server.config');
// console.log('serverConfig: ', serverConfig);

const browserConfig = require('./webpack.browser.config');
// console.log('browserConfig: ', browserConfig);

module.exports = (env) => {
    console.log('env====', env)
    return [browserConfig(env), serverConfig(env)];
}
