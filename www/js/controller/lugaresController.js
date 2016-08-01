
var app = angular.module('starter');

app.controller('lugaresController', function($scope, $ionicPopup, $ionicPlatform, LugaresFactory) {

  $scope.inserindo = false;
  $scope.novoLugar = {};
  $scope.lugaresAVisitar = [];
  $scope.lugaresVisitados = [];

  $scope.exibirOcultar = function(item) {
      item.exibir = !item.exibir;
  }

  $scope.findAll = function() {
    LugaresFactory.selectAll(true).then(function (res) {
      $scope.lugaresVisitados = res;
    });
    LugaresFactory.selectAll(false).then(function (res) {
      $scope.lugaresAVisitar = res;
    });
  };

  $scope.cancel = function() {
    $scope.inserindo = false;
    $scope.novoLugar = {};
  }
  
  $ionicPlatform.ready(function() {
    $scope.findAll();
  })

  $scope.insert = function(){
    $scope.inserindo = true;
    $novoLugar.novoLugar = {};
  };

  $scope.visitado = function(lugar) {
    LugaresFactory.visitado(lugar);
    $scope.findAll();
  }

  $scope.insertItem = function() {
    if (!$scope.novoLugar.name) {
      $ionicPopup.alert({
        title: 'Atenção',
        template: 'O campo Nome é obrigatório!'
      });
    } else {
      LugaresFactory.insert($scope.novoLugar.name, $scope.novoLugar.subtitle, $scope.novoLugar.descryption);
      $scope.inserindo = false;  
      $scope.findAll();
    }
  }
  
});
