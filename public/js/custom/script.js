var scotchApp = angular.module('scotchApp', ['ngRoute']);

scotchApp.config(function($routeProvider) {
$routeProvider

    // route for the home page
    .when('/', {
        templateUrl : 'login.html',
        controller  : 'userController',
        title: 'TimeTable | Login'
    })
    .when('/register', {
        templateUrl : 'register.html',
        controller  : 'userController',
        title: 'TimeTable | Register'
    })
    .when('/timetable', {
        templateUrl : 'timetable.html',
        controller  : 'mainController',
        title: 'TimeTable | EditDetail'
    })
    .when('/showtimetable', {
        templateUrl : 'showtimetable.html',
        controller  : 'timetableController',
        title: 'TimeTable | TimeTable'

    })
    .otherwise({redirectTo:'/'});

});

scotchApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);









  
