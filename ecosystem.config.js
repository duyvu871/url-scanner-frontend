module.exports = {
    apps: [
        {
            name: 'connected-brain-front-end-url-scanner',
            script: 'src/server.js',
            out_file: "./back-end-out.log",
            error_file: "./back-end-error.log",
            log_date_format: "DD-MM HH:mm:ss Z",
            env: {
                NODE_ENV: 'development',
                PORT: 3999
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 3999
            },
        },
    ],
}