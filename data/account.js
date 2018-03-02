'use strict';

const LogUtil = require('../utils/log');
const Account = require('../models/account');
const CreditCard = require('../models/creditCard').CreditCard;
const DeliveryAddress = require('../models/deliveryAddress').DeliveryAddress;

let data = {
    drop: function (callback) {
        Account.remove({}, function (err) {
            if (err) LogUtil.writeError(err);
            LogUtil.writeInfo('Account removed');
            CreditCard.remove({}, function (err) {
                if (err) LogUtil.writeError(err);
                LogUtil.writeInfo('CreditCard removed');
                DeliveryAddress.remove({}, function (err) {
                    if (err) LogUtil.writeError(err);
                    LogUtil.writeInfo('DeliveryAddress removed');
                    return callback();
                });
            });
        });
    },
    create: function (callback) {

// Account0
        new Account({
            username: 'customer0',
            password: 'compass0',
            firstname: 'Juliane',
            lastname: 'Schulze',
            email: 'Juliane.Schulze@gmail.com'
        })
            .save(function (err, account0) {
                if (err) LogUtil.writeError(err);
                LogUtil.writeInfo('Account 0 saved');

                new CreditCard({
                    number: '5404000000000001',
                    type: 'Mastercard',
                    _account: account0._id
                })
                    .save(function (err) {
                        if (err) LogUtil.writeError(err);
                        LogUtil.writeInfo('CreditCard saved');

                        new DeliveryAddress({
                            street: 'Im Sandbüel 93',
                            zip: 1700,
                            city: 'Fribourg',
                            country: 'Schweiz',
                            _account: account0._id
                        })
                            .save(function (err) {
                                if (err) LogUtil.writeError(err);
                                LogUtil.writeInfo('DeliveryAddress saved');

// Account1
                                new Account({
                                    username: 'customer1',
                                    password: 'compass1',
                                    firstname: 'Peter',
                                    lastname: 'Holzmann',
                                    email: 'Peter.Holzmann@gmail.com'
                                })
                                    .save(function (err, account1) {
                                        if (err) LogUtil.writeError(err);
                                        LogUtil.writeInfo('Account 1 saved');

                                        new CreditCard({
                                            number: '4900000000000086',
                                            type: 'Visa',
                                            _account: account1._id
                                        })
                                            .save(function (err) {
                                                if (err) LogUtil.writeError(err);
                                                LogUtil.writeInfo('CreditCard saved');

                                                new DeliveryAddress({
                                                    street: 'Sonnenbergstr 114',
                                                    zip: 1897,
                                                    city: 'Bouveret',
                                                    country: 'Schweiz',
                                                    _account: account1._id
                                                })
                                                    .save(function (err) {
                                                        if (err) LogUtil.writeError(err);
                                                        LogUtil.writeInfo('DeliveryAddress saved');

// Account2
                                                        new Account({
                                                            username: 'customer2',
                                                            password: 'compass2',
                                                            firstname: 'Jennifer',
                                                            lastname: 'Baumgartner',
                                                            email: 'Jennifer.Baumgartner@gmail.com'
                                                        })
                                                            .save(function (err, account2) {
                                                                if (err) LogUtil.writeError(err);
                                                                LogUtil.writeInfo('Account 2 saved');

                                                                new CreditCard({
                                                                    number: '5404000000000002',
                                                                    type: 'Mastercard',
                                                                    _account: account2._id
                                                                })
                                                                    .save(function (err) {
                                                                        if (err) LogUtil.writeError(err);
                                                                        LogUtil.writeInfo('CreditCard saved');

                                                                        new DeliveryAddress({
                                                                            street: 'Bösch 21',
                                                                            zip: 7142,
                                                                            city: 'Cumbel',
                                                                            country: 'Schweiz',
                                                                            _account: account2._id
                                                                        })
                                                                            .save(function (err) {
                                                                                if (err) LogUtil.writeError(err);
                                                                                LogUtil.writeInfo('DeliveryAddress saved');
// Account 3
                                                                                new Account({
                                                                                    username: 'customer3',
                                                                                    password: 'compass3',
                                                                                    firstname: 'Swen',
                                                                                    lastname: 'Dresner',
                                                                                    email: 'Swen.Dresner@gmail.com'
                                                                                })
                                                                                    .save(function (err, account3) {
                                                                                        if (err) LogUtil.writeError(err);
                                                                                        LogUtil.writeInfo('Account 3 saved');

                                                                                        new CreditCard({
                                                                                            number: '5404000000000003',
                                                                                            type: 'Mastercard',
                                                                                            _account: account3._id
                                                                                        })
                                                                                            .save(function (err) {
                                                                                                if (err) LogUtil.writeError(err);
                                                                                                LogUtil.writeInfo('CreditCard saved');

                                                                                                new DeliveryAddress({
                                                                                                    street: 'Via Schliffras 114',
                                                                                                    zip: 5637,
                                                                                                    city: 'Geltwil',
                                                                                                    country: 'Schweiz',
                                                                                                    _account: account3._id
                                                                                                })
                                                                                                    .save(function (err) {
                                                                                                        if (err) LogUtil.writeError(err);
                                                                                                        LogUtil.writeInfo('DeliveryAddress saved');
// Account 4

                                                                                                        new Account({
                                                                                                            username: 'customer4',
                                                                                                            password: 'compass4',
                                                                                                            firstname: 'Markus',
                                                                                                            lastname: 'Wechsler',
                                                                                                            email: 'Markus.Wechsler@gmail.com'
                                                                                                        })
                                                                                                            .save(function (err, account4) {
                                                                                                                if (err) LogUtil.writeError(err);
                                                                                                                LogUtil.writeInfo('Account 4 saved');

                                                                                                                new CreditCard({
                                                                                                                    number: '5404000000000004',
                                                                                                                    type: 'Mastercard',
                                                                                                                    _account: account4._id
                                                                                                                })
                                                                                                                    .save(function (err) {
                                                                                                                        if (err) LogUtil.writeError(err);
                                                                                                                        LogUtil.writeInfo('CreditCard saved');

                                                                                                                        new DeliveryAddress({
                                                                                                                            street: 'Obere Haltenstrasse 28',
                                                                                                                            zip: 8426,
                                                                                                                            city: 'Lufingen',
                                                                                                                            country: 'Schweiz',
                                                                                                                            _account: account4._id
                                                                                                                        })
                                                                                                                            .save(function (err) {
                                                                                                                                if (err) LogUtil.writeError(err);
                                                                                                                                LogUtil.writeInfo('DeliveryAddress saved');

// Account 5
                                                                                                                                new Account({
                                                                                                                                    username: 'customer5',
                                                                                                                                    password: 'compass5',
                                                                                                                                    firstname: 'Karolin',
                                                                                                                                    lastname: 'Boehm',
                                                                                                                                    email: 'Karolin.Boehm@gmail.com'
                                                                                                                                })
                                                                                                                                    .save(function (err, account5) {
                                                                                                                                        if (err) LogUtil.writeError(err);
                                                                                                                                        LogUtil.writeInfo('Account 5 saved');

                                                                                                                                        new CreditCard({
                                                                                                                                            number: '5404000000000005',
                                                                                                                                            type: 'Mastercard',
                                                                                                                                            _account: account5._id
                                                                                                                                        })
                                                                                                                                            .save(function (err) {
                                                                                                                                                if (err) LogUtil.writeError(err);
                                                                                                                                                LogUtil.writeInfo('CreditCard saved');

                                                                                                                                                new DeliveryAddress({
                                                                                                                                                    street: 'Bösch 82',
                                                                                                                                                    zip: 1588,
                                                                                                                                                    city: 'Cudrefin',
                                                                                                                                                    country: 'Schweiz',
                                                                                                                                                    _account: account5._id
                                                                                                                                                })
                                                                                                                                                    .save(function (err) {
                                                                                                                                                        if (err) LogUtil.writeError(err);
                                                                                                                                                        LogUtil.writeInfo('DeliveryAddress saved');

// Account 6
                                                                                                                                                        new Account({
                                                                                                                                                            username: 'customer6',
                                                                                                                                                            password: 'compass6',
                                                                                                                                                            firstname: 'Lena',
                                                                                                                                                            lastname: 'Lowe',
                                                                                                                                                            email: 'Lena.Lowe@gmail.com'
                                                                                                                                                        })
                                                                                                                                                            .save(function (err, account6) {
                                                                                                                                                                if (err) LogUtil.writeError(err);
                                                                                                                                                                LogUtil.writeInfo('Account 6 saved');

                                                                                                                                                                new CreditCard({
                                                                                                                                                                    number: '5404000000000006',
                                                                                                                                                                    type: 'Mastercard',
                                                                                                                                                                    _account: account6._id
                                                                                                                                                                })
                                                                                                                                                                    .save(function (err) {
                                                                                                                                                                        if (err) LogUtil.writeError(err);
                                                                                                                                                                        LogUtil.writeInfo('CreditCard saved');

                                                                                                                                                                        new DeliveryAddress({
                                                                                                                                                                            street: 'Im Sandbüel 93',
                                                                                                                                                                            zip: 1700,
                                                                                                                                                                            city: 'Fribourg',
                                                                                                                                                                            country: 'Schweiz',
                                                                                                                                                                            _account: account6._id
                                                                                                                                                                        })
                                                                                                                                                                            .save(function (err) {
                                                                                                                                                                                if (err) LogUtil.writeError(err);
                                                                                                                                                                                LogUtil.writeInfo('DeliveryAddress saved');

// Account 7
                                                                                                                                                                                new Account({
                                                                                                                                                                                    username: 'customer7',
                                                                                                                                                                                    password: 'compass7',
                                                                                                                                                                                    firstname: 'Ines',
                                                                                                                                                                                    lastname: 'Schiffer',
                                                                                                                                                                                    email: 'Ines.Schiffer@gmail.com'
                                                                                                                                                                                })
                                                                                                                                                                                    .save(function (err, account7) {
                                                                                                                                                                                        if (err) LogUtil.writeError(err);
                                                                                                                                                                                        LogUtil.writeInfo('Account 7 saved');

                                                                                                                                                                                        new CreditCard({
                                                                                                                                                                                            number: '5404000000000007',
                                                                                                                                                                                            type: 'Mastercard',
                                                                                                                                                                                            _account: account7._id
                                                                                                                                                                                        })
                                                                                                                                                                                            .save(function (err) {
                                                                                                                                                                                                if (err) LogUtil.writeError(err);
                                                                                                                                                                                                LogUtil.writeInfo('CreditCard saved');

                                                                                                                                                                                                new DeliveryAddress({
                                                                                                                                                                                                    street: 'Untere Aegerten 134',
                                                                                                                                                                                                    zip: 2016,
                                                                                                                                                                                                    city: 'Cortaillod',
                                                                                                                                                                                                    country: 'Schweiz',
                                                                                                                                                                                                    _account: account7._id
                                                                                                                                                                                                })
                                                                                                                                                                                                    .save(function (err) {
                                                                                                                                                                                                        if (err) LogUtil.writeError(err);
                                                                                                                                                                                                        LogUtil.writeInfo('DeliveryAddress saved');

// Account 8
                                                                                                                                                                                                        new Account({
                                                                                                                                                                                                            username: 'customer8',
                                                                                                                                                                                                            password: 'compass8',
                                                                                                                                                                                                            firstname: 'Anne',
                                                                                                                                                                                                            lastname: 'Schulz',
                                                                                                                                                                                                            email: 'Anne.Schulz@gmail.com'
                                                                                                                                                                                                        })
                                                                                                                                                                                                            .save(function (err, account8) {
                                                                                                                                                                                                                if (err) LogUtil.writeError(err);
                                                                                                                                                                                                                LogUtil.writeInfo('Account 8 saved');

                                                                                                                                                                                                                new CreditCard({
                                                                                                                                                                                                                    number: '5404000000000008',
                                                                                                                                                                                                                    type: 'Mastercard',
                                                                                                                                                                                                                    _account: account8._id
                                                                                                                                                                                                                })
                                                                                                                                                                                                                    .save(function (err) {
                                                                                                                                                                                                                        if (err) LogUtil.writeError(err);
                                                                                                                                                                                                                        LogUtil.writeInfo('CreditCard saved');

                                                                                                                                                                                                                        new DeliveryAddress({
                                                                                                                                                                                                                            street: 'Lichtmattstrasse 22',
                                                                                                                                                                                                                            zip: 3402,
                                                                                                                                                                                                                            city: 'Burgdorf',
                                                                                                                                                                                                                            country: 'Schweiz',
                                                                                                                                                                                                                            _account: account8._id
                                                                                                                                                                                                                        })
                                                                                                                                                                                                                            .save(function (err) {
                                                                                                                                                                                                                                if (err) LogUtil.writeError(err);
                                                                                                                                                                                                                                LogUtil.writeInfo('DeliveryAddress saved');

// Account 9
                                                                                                                                                                                                                                new Account({
                                                                                                                                                                                                                                    username: 'customer9',
                                                                                                                                                                                                                                    password: 'compass9',
                                                                                                                                                                                                                                    firstname: 'Mike',
                                                                                                                                                                                                                                    lastname: 'Kunze',
                                                                                                                                                                                                                                    email: 'Mike.Kunze@gmail.com'
                                                                                                                                                                                                                                })
                                                                                                                                                                                                                                    .save(function (err, account9) {
                                                                                                                                                                                                                                        if (err) LogUtil.writeError(err);
                                                                                                                                                                                                                                        LogUtil.writeInfo('Account 9 saved');

                                                                                                                                                                                                                                        new CreditCard({
                                                                                                                                                                                                                                            number: '5404000000000009',
                                                                                                                                                                                                                                            type: 'Mastercard',
                                                                                                                                                                                                                                            _account: account9._id
                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                            .save(function (err) {
                                                                                                                                                                                                                                                if (err) LogUtil.writeError(err);
                                                                                                                                                                                                                                                LogUtil.writeInfo('CreditCard saved');

                                                                                                                                                                                                                                                new DeliveryAddress({
                                                                                                                                                                                                                                                    street: 'Kronwiesenweg 63',
                                                                                                                                                                                                                                                    zip: 4581,
                                                                                                                                                                                                                                                    city: 'Küttigkofen',
                                                                                                                                                                                                                                                    country: 'Schweiz',
                                                                                                                                                                                                                                                    _account: account9._id
                                                                                                                                                                                                                                                })
                                                                                                                                                                                                                                                    .save(function (err) {
                                                                                                                                                                                                                                                        if (err) LogUtil.writeError(err);
                                                                                                                                                                                                                                                        LogUtil.writeInfo('DeliveryAddress saved');

// Account 10
                                                                                                                                                                                                                                                        new Account({
                                                                                                                                                                                                                                                            username: 'customer10',
                                                                                                                                                                                                                                                            password: 'compass10',
                                                                                                                                                                                                                                                            firstname: 'Bernd',
                                                                                                                                                                                                                                                            lastname: 'Zimmer',
                                                                                                                                                                                                                                                            email: 'Bernd.Zimmer@gmail.com'
                                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                                            .save(function (err, account10) {
                                                                                                                                                                                                                                                                if (err) LogUtil.writeError(err);
                                                                                                                                                                                                                                                                LogUtil.writeInfo('Account 10 saved');

                                                                                                                                                                                                                                                                new CreditCard({
                                                                                                                                                                                                                                                                    number: '5404000000000010',
                                                                                                                                                                                                                                                                    type: 'Mastercard',
                                                                                                                                                                                                                                                                    _account: account10._id
                                                                                                                                                                                                                                                                })
                                                                                                                                                                                                                                                                    .save(function (err) {
                                                                                                                                                                                                                                                                        if (err) LogUtil.writeError(err);
                                                                                                                                                                                                                                                                        LogUtil.writeInfo('CreditCard saved');

                                                                                                                                                                                                                                                                        new DeliveryAddress({
                                                                                                                                                                                                                                                                            street: 'Bahnhofstrasse 19',
                                                                                                                                                                                                                                                                            zip: 1196,
                                                                                                                                                                                                                                                                            city: 'Gland',
                                                                                                                                                                                                                                                                            country: 'Schweiz',
                                                                                                                                                                                                                                                                            _account: account10._id
                                                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                                                            .save(function (err) {
                                                                                                                                                                                                                                                                                if (err) LogUtil.writeError(err);
                                                                                                                                                                                                                                                                                LogUtil.writeInfo('DeliveryAddress saved');

// Account 11
                                                                                                                                                                                                                                                                                new Account({
                                                                                                                                                                                                                                                                                    username: 'customer11',
                                                                                                                                                                                                                                                                                    password: 'compass11',
                                                                                                                                                                                                                                                                                    firstname: 'Jessica',
                                                                                                                                                                                                                                                                                    lastname: 'Krueger',
                                                                                                                                                                                                                                                                                    email: 'Jessica.Krueger@gmail.com'
                                                                                                                                                                                                                                                                                })
                                                                                                                                                                                                                                                                                    .save(function (err, account11) {
                                                                                                                                                                                                                                                                                        if (err) LogUtil.writeError(err);
                                                                                                                                                                                                                                                                                        LogUtil.writeInfo('Account 11 saved');

                                                                                                                                                                                                                                                                                        new CreditCard({
                                                                                                                                                                                                                                                                                            number: '5404000000000011',
                                                                                                                                                                                                                                                                                            type: 'Mastercard',
                                                                                                                                                                                                                                                                                            _account: account11._id
                                                                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                                                                            .save(function (err) {
                                                                                                                                                                                                                                                                                                if (err) LogUtil.writeError(err);
                                                                                                                                                                                                                                                                                                LogUtil.writeInfo('CreditCard saved');

                                                                                                                                                                                                                                                                                                new DeliveryAddress({
                                                                                                                                                                                                                                                                                                    street: 'Piazza Rezzonico 33',
                                                                                                                                                                                                                                                                                                    zip: 2057,
                                                                                                                                                                                                                                                                                                    city: 'Villiers',
                                                                                                                                                                                                                                                                                                    country: 'Schweiz',
                                                                                                                                                                                                                                                                                                    _account: account11._id
                                                                                                                                                                                                                                                                                                })
                                                                                                                                                                                                                                                                                                    .save(function (err) {
                                                                                                                                                                                                                                                                                                        if (err) LogUtil.writeError(err);
                                                                                                                                                                                                                                                                                                        LogUtil.writeInfo('DeliveryAddress saved');
                                                                                                                                                                                                                                                                                                        return callback();
                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                            });
                                                                                                                                                                                                                    });
                                                                                                                                                                                                            });
                                                                                                                                                                                                    });
                                                                                                                                                                                            });
                                                                                                                                                                                    });
                                                                                                                                                                            });
                                                                                                                                                                    });
                                                                                                                                                            });
                                                                                                                                                    });
                                                                                                                                            });
                                                                                                                                    });
                                                                                                                            });
                                                                                                                    });
                                                                                                            });
                                                                                                    });
                                                                                            });
                                                                                    });
                                                                            });
                                                                    });
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });
            });
    }
};

module.exports = data;
