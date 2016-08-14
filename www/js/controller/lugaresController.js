
var app = angular.module('starter');

app.controller('lugaresController', function($scope, $ionicPopup, $ionicPlatform, LugaresFactory) {

  $scope.inserindo = false;
  $scope.novoLugar = {};
  $scope.lugaresAVisitar = [];
  $scope.lugaresVisitados = [];

  $scope.hideShow = function(item) {
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
    $scope.novoLugar = {};
  };

  $scope.visited = function(lugar) {
    LugaresFactory.visited(lugar);
    $scope.findAll();
  }

  $scope.edit = function(lugar) {
    LugaresFactory.select(lugar.id).then(function (res) {
      $scope.novoLugar = res;
    })
    $scope.inserindo = true;
  }

  $scope.delete = function(lugar) {
    LugaresFactory.delete(lugar);
    $scope.findAll();
  }

  $scope.insertItem = function() {
    if (!$scope.novoLugar.name) {
      $ionicPopup.alert({
        title: 'Atenção',
        template: 'O campo Nome é obrigatório!'
      });
    } else {
      if ($scope.novoLugar.id) {
        LugaresFactory.update($scope.novoLugar);     
      } else {
        LugaresFactory.insert($scope.novoLugar.name, $scope.novoLugar.subtitle, $scope.novoLugar.descryption);
      }
      $scope.inserindo = false;  
      $scope.findAll();
    }
  }
  
});
