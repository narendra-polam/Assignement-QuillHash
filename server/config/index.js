require('./lib/index');

const {
    APP_PORT,
    log_path
} = process.env;

module.exports = {
    APP_PORT: APP_PORT || 8080,
    log_path
};