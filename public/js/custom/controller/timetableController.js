scotchApp.controller('timetableController', function($scope,$window,$http,$location,auth) {
    
  if(auth.getToken() == null){$location.path('/');}
  var LoginUser={};
  if(auth.getToken()){
    var LoginUser=JSON.parse($window.localStorage['userData']);
    $scope.UserRole=LoginUser.role;
    //console.log($scope.UserRole);
  }

  $scope.GetUserSavedData = function() {
    $http.post('/get/subject/class',{'user_id':LoginUser._id,'user_role':LoginUser.role})
    .success(function(response) {
      $scope.UsersavedData = response; 
      //console.log($scope.UsersavedData);
      $scope.GeTimeTableData($scope.UsersavedData);  
    })
    .error(function(response) {
        alert('error');
    });
  };

  $scope.GeTimeTableData = function(data) {
    $http.post('/get/timetable',{'data':data})
    .success(function(response) {
      $scope.TimeTableData = response; 
      //console.log($scope.TimeTableData);
    })
    .error(function(response) {
        alert('error');
    });
  };
  $scope.GetUserSavedData();    
});