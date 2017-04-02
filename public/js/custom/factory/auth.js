scotchApp.factory('auth', function($window){
  var o = {
  };

   o.getToken = function (){
    //console.log(JSON.parse($window.localStorage['userData']));
    return $window.localStorage['userData'];
  }

  return o;
    
 }); 