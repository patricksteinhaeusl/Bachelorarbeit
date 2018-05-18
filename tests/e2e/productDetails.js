'use strict';
const HelperFunctions = require('./helperFunctions.js');

describe('Product Details', function () {
    beforeAll(function () {
        HelperFunctions.login(browser, 'customer0', 'compass0');
        element(by.linkText('Shop')).click();
    });

    afterAll(function () {
        HelperFunctions.logout(browser);
    });

    describe('Product', function () {
        it('should have Details View with same attributes in details view as in overview', function () {
            element.all(by.repeater('product in shop.products')).then(function (products) {
                let firstProduct = products[0];
                let product1Name = firstProduct.element(by.binding('product.name')).getText();
                let product1Category = firstProduct.element(by.binding('product.category')).getText().then(function (text) {
                    return "Category: " + text ;
                });
                let product1Size = firstProduct.element(by.binding('product.size')).getText().then(function (text) {
                    return "Size: " + text ;
                });
                let product1Price = firstProduct.element(by.binding('product.price')).getText().then(function (text) {
                    return "Price: " + text ;
                });
                firstProduct.element(by.linkText('Details')).click();
                expect(element(by.binding('product.data.product.name')).getText()).toBe(product1Name);
                expect(element(by.binding('product.data.product.category.name')).getText()).toBe(product1Category);
                expect(element(by.binding('product.data.product.size')).getText()).toBe(product1Size);
                expect(element(by.binding('product.data.product.price')).getText()).toBe(product1Price);
            });
        });
    });

    describe('Ask Questions', function () {
        let QuestionString = "To be or not to be that is the question";
        it('should be able to ask a question', function () {
            let QuestionCount = element.all(by.repeater('question in product.data.product.questions')).count();
            //Fill out Input
            element(by.model('product.data.question.text')).clear().then(function () {
                element(by.model('product.data.question.text')).sendKeys(QuestionString);
            });
            element(by.buttonText('Save')).click();
            /*expect(element.all(by.className('alert alert-success alert-dismissible ')).get(0).getText()).toBe("Success: Question saved successfully.\n×");*/
            element.all(by.repeater('question in product.data.product.questions')).count().then(function (newCount) {
                expect(QuestionCount).toBe(newCount-1);
            });
        });

        it('asked question should be visible and be on the bottom of all questions', function () {
            element.all(by.repeater('question in product.data.product.questions')).then(function (question) {
                expect(question[question.length-1].element(by.binding('question.text')).getText()).toBe(QuestionString);
            });
        });
    });
});
