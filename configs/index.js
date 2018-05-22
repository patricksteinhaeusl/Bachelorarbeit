'use strict';

const authSecret = '6a5d1f68as189c1asd31c98ad74f$ä¨ü123^01230dfasdklöfj asjfklö ä$das-füadfc$äsdä-$ad maklfjolu89ujpoadfädüafcnadszucfbhjk9m vkldf mlökl';
const fs = require('fs');
const sslKey = fs.readFileSync('encryption/key.pem');
const sslCert = fs.readFileSync( 'encryption/cert.pem' );

const config = {
    server: {
        host: '0.0.0.0',
        port: '3000',
        sslPort: '3443',
        SSRFPort: '8765'
    },
    sslOptions: {
        key: sslKey,
        cert: sslCert
    },
    crypt: {
        hash: 'sha256',
        secret: 'kslafjop2)/)*(ZOJKN*K*JL*IU%*IO%JH'
    },
    mongo: {
        username: 'webshopEditor',
        password: '1234',
        host: 'localhost',
        port: 27017,
        name: 'webshop',
        connectionString: function () {
            return 'mongodb://' + this.username + ':' + this.password + '@' + this.host + ':' + this.port + '/' + this.name;
        }
    },
    jwt: {
        secret: authSecret,
    },
    auth: {
        signOptions: {
            audience: 'self',
            issuer: 'webshop',
        },
        validateOptions: {
            secret: authSecret,
            audience: 'self',
            issuer: 'webshop'
        }
    },
    postImages: {
        directory: './assets/post-images/',
    },
    accountProfile: {
        directory: './public/app/assets/profiles/',
    }
};

module.exports = config;
