(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://angularspa.herokuapp.com')
 // the path is available at the time of submission [NOV 2016], could be removed later on
 // then **TRY** this 'https://davids-restaurant.herokuapp.com'
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
