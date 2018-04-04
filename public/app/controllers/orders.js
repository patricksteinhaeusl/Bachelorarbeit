'use strict';

appControllers.controller('OrdersController', ['$scope', '$filter', 'OrdersService', 'AuthService', function ($scope, $filter, ordersService, authService) {
    const self = this;

    self.data = {};
    self.data.orders = {};
    self.export = {};
    self.export.from = 0;
    self.export.to = 0;

    self.init = function () {
        self.getAllByAccount();
    };

    self.getAllByAccount = function () {
        ordersService.getAllByAccount(authService.getUser()._id, function (orders) {
            self.data.orders = orders;
        });
    };

    function buildTableBody() {
        let body = [];

        let header = [
            { text: 'Created', bold: true },
            { text: 'Order', bold: true },
            { text: 'Status', bold: true },
            { text: 'Total price', bold: true }
        ];

        body.push(header);

        let counter = 1;
        self.data.orders.forEach(function(order) {
            if(counter >= self.export.from && counter <= self.export.to) {
                let createdAt = $filter('date')(order.createdAt, 'dd.MM.yyyy HH:mm:ss', '+0100');
                let totalPrice = order.totalPrice + ' CHF';

                let row = [createdAt , order._id, order.status, totalPrice ];

                body.push(row);
            }
            counter++;
        });

        return body;
    }

    self.downloadPDF = function() {
        let docDefinition = {
            pageOrientation: 'landscape',
            pageMargins: [ 40, 60, 40, 60 ],

            header: { text: 'Order output as pdf', margin: [25, 10, 25, 10] },

            footer: {
                columns: [
                    { text: $filter('date')(new Date(), 'dd.MM.yyyy HH:mm:ss', '+0100'), alignment: 'left', margin: [25, 10, 25, 10]}
                ]
            },

            content: [
                { text: 'Orders', fontSize: 17, margin: [0, 0, 0, 25] },
                {
                    table: {
                        headerRows: 1,
                        widths: [ '*', '*', '*', '*' ],

                        body: buildTableBody()
                    }
                }
            ]
        };

        pdfMake.createPdf(docDefinition).download();
    };

    self.init();

}]);
