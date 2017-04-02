scotchApp.controller('AuthCtrl', function($scope,$window,$location,auth){

  $scope.getToken = function (){
    return auth.getToken();
  }

  $scope.getName = function (){
    if(auth.getToken()){
      var LoginUser=JSON.parse($window.localStorage['userData']);
      return LoginUser.name+"  "+LoginUser.email;
      
    } else {
      return null;
    }
  }

  $scope.logOut = function(){
        $window.localStorage.removeItem('userData');
        $location.path('/'); 
  };
});