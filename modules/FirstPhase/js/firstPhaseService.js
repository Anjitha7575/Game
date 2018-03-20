angular.module('vidTApp.firstPhase.firstPhaseService',[]).factory('firstPhaseService',['$http','$q','testUrl','baseUrl',function($http, $q, testUrl, baseUrl){

    var factory = {};

    factory.upload = function(file) {
        var upl = $http({
            method: 'POST',
            url:'http://jsonplaceholder.typicode.com/posts', // /api/upload
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
                upload: file
            },
            transformRequest: function(data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function(value, key) {
                    formData.append(key, value);
                });

                var headers = headersGetter();
                delete headers['Content-Type'];

                return formData;
            }
        });
        return upl.then(handleSuccess, handleError);

    } // End upload function

    // ---
    // PRIVATE METHODS.
    // ---

    function handleError(response, data) {
        if (!angular.isObject(response.data) ||!response.data.message) {
            return ($q.reject("An unknown error occurred."));
        }

        return ($q.reject(response.data.message));
    }

    function handleSuccess(response) {
        return (response);
    }


    return factory;

}]);