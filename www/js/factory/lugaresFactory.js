angular.module('starter.factories', [])
.factory('LugaresFactory', function($cordovaSQLite, $q) {

	return {
    	insert : function (name, subtitle, descryption) {
        var query = "INSERT INTO lugares (name, subtitle, descryption, visited) VALUES (?, ?, ?, ?);";
        var values = [name, subtitle, descryption, 0];
        $cordovaSQLite.execute(db, query, values);
      },

      update : function (item) {
        var query = "update lugares set name = ?, subtitle = ?, descryption = ? where id = ?;";
        var values = [item.name, item.subtitle, item.descryption, item.id];
        $cordovaSQLite.execute(db, query, values);
      },

      delete : function (item) {
        var query = "delete from lugares where id = ?;";
        var values = [item.id];
        $cordovaSQLite.execute(db, query, values);
      },
    	
      select : function (id) {
        var query = "SELECT * FROM lugares WHERE id=?";
        var values = [id];
        
        var q = $q.defer();
        $cordovaSQLite.execute(db, query, values).then(
          function(res) {
              if (res.rows.length > 0) {
                var first = res.rows.item(0);
                q.resolve(first);                
              }
          }
        );
        return q.promise;
      },

    	selectAll : function (visited) {
        var query = "SELECT * FROM lugares";
        if (visited) {
          query = query.concat(' where visited = 1');
        } else {
          query = query.concat(' where visited = 0');
        }
        var q = $q.defer();
        $cordovaSQLite.execute(db, query).then(
          function(res) {
              var lugares = [];
              for (var i = res.rows.length - 1; i >= 0; i--) {
                var item = res.rows[i];
                lugares.push(res.rows.item(i));
              };
              q.resolve(lugares);
          }
        );
        return q.promise;    
      },

      visited : function(lugar) {
        debugger;
        var query = "update lugares set visited = 1 where id=?";
        var parameters = [lugar.id];
        return $cordovaSQLite.execute(db, query, parameters);
      }
  	}

});



