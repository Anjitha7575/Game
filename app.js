angular.module('vidTApp',['ui.router', 'ngAria', 'ui.bootstrap','vidTApp.firstPhase'],function config($ariaProvider){
    $ariaProvider.config({
        ariaValue: true,
        tabindex: true
    });
});

angular.module('vidTApp').constant('baseUrl', "mocks").constant('testUrl', "mocks");

angular.module('vidTApp').run(['$http', '$rootScope', '$window', function($http, $rootScope, $window) {

}]);