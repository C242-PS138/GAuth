const Hapi = require('@hapi/hapi');

'use strict';


const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello, world!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();