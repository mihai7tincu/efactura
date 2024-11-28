(function () {
    'use strict';
    angular
        .module("myApp")
        .controller("invoiceCtrl", invoiceCtrl);
    function invoiceCtrl($scope) {
        Decimal.set({ rounding: Decimal.ROUND_DOWN })

        $scope.title = 'Calcule factura';
        $scope.exchangeRate = 4.9759;
        $scope.rate = 40;
        $scope.vatPercentage = 19;
        $scope.workedHours = 218;
        $scope.getUnitPrice = function () {
            if (!$scope.rate)
                $scope.rate = 0;
            if (!$scope.exchangeRate)
                $scope.exchangeRate = 0;

            let rate = new Decimal($scope.rate);
            let exchangeRate = new Decimal($scope.exchangeRate);
            let result = rate.times(exchangeRate).toDecimalPlaces(2);
            return result.toString();
        }
        $scope.getNetValue = function () {
            if (!$scope.workedHours)
                $scope.workedHours = 0;

            let unitPrice = new Decimal($scope.getUnitPrice());
            let workedHours = new Decimal($scope.workedHours);
            let result = unitPrice.times(workedHours).toDecimalPlaces(2);
            return result.toString();
        }
        $scope.getVatValue = function () {
            if (!$scope.vatPercentage)
                $scope.vatPercentage = 0;

            let netValue = new Decimal($scope.getNetValue());
            let vatPercentage = new Decimal($scope.vatPercentage);
            let result = netValue.times(vatPercentage).dividedBy(100).toDecimalPlaces(2);
            return result.toString();
        }
        $scope.getTotal = function () {
            let netValue = new Decimal($scope.getNetValue());
            let vatValue = new Decimal($scope.getVatValue());
            let result = netValue.add(vatValue).toDecimalPlaces(2);
            return result.toString();
        }
    }
})();