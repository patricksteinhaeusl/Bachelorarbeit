'use strict';

appControllers.controller('OrdersController', ['$scope', '$filter', 'OrdersService', 'AuthService',
function ($scope, $filter, OrdersService, AuthService) {
    const self = this;

    self.data = {};
    self.data.orders = {};
    self.export = {};
    self.export.from = null;
    self.export.range = null;

    self.init = function () {
        self.getAllByAccount();
    };

    self.getAllByAccount = function () {
        OrdersService.getAllByAccount(AuthService.getUser()._id, function (error, data) {
            if(data) {
                let orders = data.orders;
                self.data.orders = orders;
            }
        });
    };

    function buildTableBody(from, to) {
        let body = [];

        let header = [
            { text: 'Created', bold: true, fontSize: 12 },
            { text: 'Order', bold: true, fontSize: 12 },
            { text: 'Status', bold: true, fontSize: 12 },
            { text: 'Total price', bold: true, fontSize: 12 }
        ];

        body.push(header);

        let counter = 1;
        let row;
        self.data.orders.forEach(function(order) {
            if(counter >= from && counter <= to) {
                let createdAt = $filter('date')(order.createdAt, 'dd.MM.yyyy HH:mm:ss', '+0200');
                let totalPrice = order.totalPrice.toFixed(2) + ' CHF';

                row = [
                    { text: createdAt, bold: true, fontSize: 10 },
                    { text: order._id, bold: true, fontSize: 10 },
                    { text: order.status, bold: true, fontSize: 10 },
                    { text: totalPrice, bold: true, fontSize: 10 }
                ];
                body.push(row);

                order.items.forEach(function(item) {
                    let itemName = item.quantity + ' x ' + item.product.name;
                    let itemPrice = (item.quantity * item.product.price).toFixed(2) + ' CHF';
                    row = [
                        { text: itemName, fontSize: 10, colSpan: 3, marginLeft: 15 },
                        {},
                        {},
                        { text: itemPrice, fontSize: 10 }
                    ];
                    body.push(row);
                });
            }
            counter++;
        });

        return body;
    }

    self.downloadPDF = function() {
        if(!self.export.from || !self.export.range) {
            $rootScope.messages.warnings.push('Parameter from or range is missing!');
        } else {
            OrdersService.getFromTo(self.export.from, self.export.range, function (error, data) {
                if(data) {
                    let from = data.from;
                    let to = data.to;
                    let docDefinition = {
                        pageOrientation: 'landscape',
                        pageMargins: [ 40, 60, 40, 60 ],

                        header: { text: 'Order output as pdf', margin: [25, 10, 25, 10] },

                        footer: function(currentPage, pageCount) {
                            return {
                                margin:10,
                                columns: [
                                    { text: $filter('date')(new Date(), 'dd.MM.yyyy HH:mm:ss', '+0200'), alignment: 'left', margin: 25},
                                    { text: currentPage.toString() + ' of ' + pageCount, alignment: 'right', margin: 25 }
                                ]
                            };
                        },

                        content: [
                            { text: 'Orders', fontSize: 17, margin: [0, 0, 0, 25] },
                            {
                                table: {
                                    headerRows: 1,
                                    widths: [ '*', '*', '*', '*' ],

                                    body: buildTableBody(from, to)
                                }
                            }
                        ]
                    };

                    pdfMake.createPdf(docDefinition).download();
                    self.export.from = null;
                    self.export.range = null;
                }
            });
        }
    };

    self.init();

}]);
