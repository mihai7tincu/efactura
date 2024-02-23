(function () {
    'use strict';
    angular
        .module("myApp")
        .controller("invoiceCtrl", invoiceCtrl);
    function invoiceCtrl($scope) {
        $scope.title = 'Calcule factura';
        $scope.exchangeRate = 4.9759;
        $scope.rate = 42;
        $scope.vatPercentage = 0;
        $scope.workedHours = 218;
        $scope.unitPrice = $scope.rate * $scope.exchangeRate;
        $scope.truncatedUnitPrice = function () {
            return Math.floor($scope.rate * $scope.exchangeRate * 100) / 100;
        }
        $scope.netTotal = function () {
            return $scope.truncatedUnitPrice() * $scope.workedHours;
        }
        $scope.vatValue = $scope.netTotal() * $scope.vatPercentage / 100;
        $scope.getVat = function () {
            return Math.floor($scope.netTotal() * $scope.vatPercentage / 100 * 100) / 100;
        }
        $scope.getTotal = function () {
            return $scope.netTotal() + $scope.getVat();
        }
    }
})();