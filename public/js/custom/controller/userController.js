scotchApp.controller('userController', function($scope,$window,$http,$location,auth) {
   
    //console.log(JSON.parse(localStorage.getItem("userData")));

     if(auth.getToken() != null){
        $location.path('/showtimetable'); 
    }

    $scope.message = '';
    $scope.userData = {};
    $scope.roles = ['Teacher','Student'];
     $scope.user={};
     $scope.login={};

     $(document).ready(function () {
        $( "#dob" ).datepicker({
          changeMonth: true,
          changeYear: true,
          maxDate : "0",
          dateFormat : 'dd/mm/yy'
        });
    });

     $scope.userRegister = function() {
        $scope.message = '';
        //console.log($scope.user);
        $http.post('/register', $scope.user)
        .success(function(response) {
            $scope.userData = response; 
            $window.localStorage['userData']=JSON.stringify($scope.userData);
            //console.log(JSON.parse(localStorage.getItem("userData")));
            $location.path('/showtimetable'); 
        })
        .error(function(response) {
            $scope.message = response.message;
            //console.log($scope.message);
        });
    };

    $scope.userLogin = function() {
        $scope.message = '';
        //console.log($scope.login);
         $http.post('/login', $scope.login)
        .success(function(response) {
            $scope.userData = response;
            $window.localStorage['userData']=JSON.stringify($scope.userData);
           // console.log(JSON.parse(localStorage.getItem("userData")));
            $location.path('/showtimetable'); 
        })
        .error(function(response) {
            $scope.message = response.message;
            //console.log($scope.message);
        });

    };
});