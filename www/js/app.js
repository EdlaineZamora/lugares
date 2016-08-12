var db = null;

var app = angular.module('starter', ['ionic', 'ngCordova', 'starter.factories']);

app.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    if (window.cordova) {
      db = $cordovaSQLite.openDB({name: "lugares.db", location: 1});
        $cordovaSQLite.execute(db, 
        "CREATE TABLE IF NOT EXISTS lugares (id integer primary key, name varchar(10), subtitle varchar(100), descryption text, visited integer)");        
    } else {
      db = window.openDatabase("lugares.db", "1.0", "lugares", -1);
      $cordovaSQLite.execute(db, 
      "CREATE TABLE IF NOT EXISTS lugares (id integer primary key, name varchar(10), subtitle varchar(100), descryption text, visited integer)");      
    }  
  });
})
