angular.module('vidTApp.firstPhase',['vidTApp.firstPhase.firstPhaseController','vidTApp.firstPhase.firstPhaseService']);

angular.module('vidTApp.firstPhase').config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home',{
        url : '/home',
        controller: 'firstPhaseController',
        templateUrl:'modules/FirstPhase/view/startingPage.html'
    })

}])