'use strict';

let authSecret = '6a5d1f68as189c1asd31c98ad74f$ä¨ü123^01230dfasdklöfj asjfklö ä$das-füadfc$äsdä-$ad maklfjolu89ujpoadfädüafcnadszucfbhjk9m vkldf mlökl';


const config = {
    server: {
        host: '0.0.0.0',
        port: '3000'
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
            return 'mongodb://' + this.username + ':' + this.password + '@' +this.host + ':' + this.port + '/' + this.name;
        }
    },
    jwt: {
        secret: authSecret,
    },
    auth: {
        signOptions: {
            expiresIn: '1d',
            audience: 'self',
            issuer: 'shop'
        },
        validateOptions: {
            secret: authSecret,
            audience: 'self',
            issuer: 'shop'
        },
        unprotectedRoutes: {
            path: [
                '/api/product',
                '/api/product/category',
                '/api/product/toprated',
                '/api/product/latest',
                new RegExp('/api\/product\/category\/.*', 'i'),
                new RegExp('/api\/product\/searchvalue\/.*', 'i'),
                '/api/post',
                '/api/creditcard'
            ]
        }
    },
    postImages: {
        directory: './assets/post-images/',
        defaultImages: ['default.png', 'default.svg', 'schelbert-froschmaultreicheln.jpg', 'steiner-innenschweiz.jpg', 'zurfluh-bissen.jpg']
    }
};

module.exports = config;
