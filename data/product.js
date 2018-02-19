'use strict';

const LogUtil = require('../utils/log');
const Category = require('../models/category').Category;
const Product = require('../models/product').Product;

let data = {
  drop: function(callback) {
    Product.remove({}, function(err) {
      if(err) LogUtil.writeError(err);
      LogUtil.writeInfo('Product removed');
      return callback();
    });
  },
  create: function(callback) {

// Category 0
    new Category({
      name: 'Schelbert'
    }).save(function(err, category0) {
      if(err) LogUtil.writeError(err);
      LogUtil.writeInfo('Category 0 saved');

      // Product 0
      new Product({
        name: 'Froschmaultreicheln',
        category: category0,
        size: 15,
        price: 250.00,
        image: 'schelbert-froschmaultreicheln.jpg',
        ratings: []
      })
      .save(function(err) {
        if(err) LogUtil.writeError(err);
        LogUtil.writeInfo('Product saved');

// Product 1
        new Product({
          name: 'Prageltreicheln',
          category: category0,
          size: 10,
          price: 200.00,
          image: 'schelbert-prageltreicheln.jpg',
          ratings: []
        })
        .save(function(err) {
          if(err) LogUtil.writeError(err);
          LogUtil.writeInfo('Product saved');

// Product 2

          new Product({
            name: 'Gotthardtreicheln',
            category: category0,
            size: 10,
            price: 180.90,
            image: 'schelbert-gotthardtreicheln.jpg',
            ratings: []
          })
          .save(function(err) {
            if (err) LogUtil.writeError(err);
            LogUtil.writeInfo('Product saved');

// Category 1

            new Category({
              name: 'Zurfluh'
            }).save(function(err, category1) {
              if(err) LogUtil.writeError(err);
              LogUtil.writeInfo('Category 1 saved');

// Product 3
              new Product({
                name: 'Treicheln',
                category: category1,
                size: 25,
                price: 325.00,
                image: 'zurfluh-treicheln.jpg',
                ratings: []
              })
              .save(function(err) {
                if(err) LogUtil.writeError(err);
                LogUtil.writeInfo('Product 3 saved');

// Product 4
                new Product({
                  name: 'Bissen',
                  category: category1,
                  size: 15,
                  price: 235.00,
                  image: 'zurfluh-bissen.jpg',
                  ratings: []
                })
                .save(function(err) {
                  if(err) LogUtil.writeError(err);
                  LogUtil.writeInfo('Product 4 saved');

// Category 2
                  new Category({
                    name: 'Steiner, Wynigen'
                  }).save(function(err, category2) {
                    if(err) LogUtil.writeError(err);
                    LogUtil.writeInfo('Category 2 saved');

// Product 5
                    new Product({
                      name: 'Berner Treicheln',
                      category: category2,
                      size: 10,
                      price: 125.25,
                      image: 'steiner-treicheln.jpg',
                      ratings: []
                    })
                    .save(function(err) {
                      if(err) LogUtil.writeError(err);
                      LogUtil.writeInfo('Product 5 saved');

// Product 6
                      new Product({
                        name: 'Modell Innenschweiz',
                        category: category2,
                        size: 25,
                        price: 400.00,
                        image: 'steiner-innenschweiz.jpg',
                        ratings: []
                      })
                      .save(function(err) {
                        if(err) LogUtil.writeError(err);
                        LogUtil.writeInfo('Product 6 saved');
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
  }
};

module.exports = data;