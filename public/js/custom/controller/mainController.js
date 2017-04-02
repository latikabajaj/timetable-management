  

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope,$window,$http,$location,auth) {
    
  if(auth.getToken() == null){$location.path('/');}
  var LoginUser={};
  if(auth.getToken()){
    var LoginUser=JSON.parse($window.localStorage['userData']);
    $scope.UserRole=LoginUser.role;
    //console.log($scope.UserRole);
  }
  
  $scope.ClassSubject = {}; 
  $scope.classcheck ={};
  $scope.StdClass = { option: '' }

  $scope.GetUserSavedData = function() {
    $http.post('/get/subject/class',{'user_id':LoginUser._id,'user_role':LoginUser.role})
    .success(function(response) {
        $scope.UsersavedData = response; 
        //console.log($scope.UsersavedData);
    })
    .error(function(response) {
        alert('error');
    });
  };

  $scope.GetClassSubject = function() {
    $http.post('/class/data')
    .success(function(response) {
        $scope.ClassSubject = response; 
        //console.log($scope.ClassSubject);
        if(LoginUser.role == "Student"){
          $scope.GetSelectedDataByStudent();  
        }
        if(LoginUser.role == "Teacher"){
          $scope.GetSelectedDataByTeacher();
        }

    })
    .error(function(response) {
        alert('error');
    });
  };
  
  $scope.saveClassSubject=function(){
    //console.log($scope.classcheck);
    var saveDetail=[];
    //console.log(Object.keys($scope.classcheck).length);
    for (var i = 0; i < Object.keys($scope.classcheck).length; i++) {
        var classKey=Object.keys($scope.classcheck)[i];
        //console.log(classKey);
        if($scope.classcheck[classKey].id ==true){
          var std_subjects=$scope.classcheck[classKey].subject;
          for (var j = 0; j < Object.keys(std_subjects).length; j++) {
            var subjectKey=Object.keys(std_subjects)[j];
            if($scope.classcheck[classKey].subject[subjectKey].id == true){
              saveDetail.push({user: LoginUser._id, role:  LoginUser.role,
              class:  classKey, subject:  subjectKey
            });  
            }
          }
        } 
    }
    //console.log(saveDetail);
    $scope.SaveData(saveDetail);
  }
  $scope.saveClass=function(){
    //console.log($scope.StdClass.option);
    var saveDetail=[];
    for (var i = 0; i < $scope.ClassSubject.length; i++) {
      if($scope.ClassSubject[i]._id == $scope.StdClass.option)
      {
        var std_subjects=$scope.ClassSubject[i].subject;
        for (var j = 0; j < std_subjects.length; j++) {
          saveDetail.push({user: LoginUser._id, role:  LoginUser.role,
            class:  $scope.StdClass.option, subject:  std_subjects[j]._id
          });  
        }
      }
    }
    //console.log(saveDetail);
    $scope.SaveData(saveDetail);
  }

  $scope.SaveData = function(data) {
    $http.post('/save/subject/class',{'data':data})
    .success(function(response) {
        //console.log(response);
        $location.path('/showtimetable');

    })
    .error(function(response) {
        alert('error');
    });
  };

  $scope.GetSelectedDataByStudent=function(){
    if(LoginUser.role == "Student"){
      for (var i = 0; i < $scope.ClassSubject.length; i++) {
        if($scope.ClassSubject[i]._id==$scope.UsersavedData[0].class){
          $scope.StdClass.option=$scope.ClassSubject[i]._id;
          break;
        }
      }  
    }
  };

  $scope.GetSelectedDataByTeacher=function(){
    //console.log($scope.ClassSubject);
    //console.log($scope.UsersavedData);
    if(LoginUser.role == "Teacher"){
      for (var i = 0; i < $scope.ClassSubject.length; i++) {
        var d1=$scope.ClassSubject[i]._id;
        var sub={};var id=false;
        for (var j = 0; j < $scope.UsersavedData.length; j++) {
          if ($scope.ClassSubject[i]._id ==$scope.UsersavedData[j].class) {
            id=true;
            var subject=$scope.ClassSubject[i].subject;
            for (var k = 0; k < subject.length; k++) {
              if ($scope.UsersavedData[j].subject == subject[k]._id) {
                sub[subject[k]._id]={'id':true}; break;
              }
            }
          }
        }
        $scope.classcheck[d1]={'id':id,'subject':sub};
      }
      //console.log($scope.classcheck);  
    }
  };

  //$scope.GetSelected();
  $scope.GetUserSavedData();
  $scope.GetClassSubject();
    
});