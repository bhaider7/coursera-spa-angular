(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  service.hasUserSignedUp = false;
  service.user = [];
  service.menuItem = [];

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getFavDish = function (short_name) {
    return $http.get(ApiPath + '/menu_items/'+ short_name + '.json').
              then(function (response) {
                service.menuItem = response.data;
                return response;
              }
            );
  };

  service.setUserInfo = function (userData) {
    if (!userData) { // if no data is provided, reset the variables
      service.user = [];
      service.hasUserSignedUp = false;
      return;
    }
      service.user = userData;
      service.hasUserSignedUp = true;
  };
}



})();
