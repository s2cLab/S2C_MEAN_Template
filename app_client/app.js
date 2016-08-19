(function () {

angular.module('appNameApp', ['ngRoute', 'ngSanitize']);
 
  function config ($routeProvider, $locationProvider) {
    
    if(window.location.pathname !== '/' ) {
      window.location.href = '/#' + window.location.pathname;
    }
    $routeProvider
      .when('/', {
        templateUrl: '/home/home.view.html',
        controller :  'homeCtrl',
        controllerAs : 'vm',
        title : 'S2C Lab'
      })
      .otherwise({redirectTo: '/'});
      
      $locationProvider.html5Mode(true);
  }

angular
  .module('appNameApp')
  .config(['$routeProvider', '$locationProvider', config]);
  
})();