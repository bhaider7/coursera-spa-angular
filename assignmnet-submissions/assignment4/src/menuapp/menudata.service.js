(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  var ctgrs = service.getAllCategories = function(){
    return $http({
      method: 'GET',
      url: (ApiBasePath + "/categories.json")
    }).then(function (result) {
      return result.data;
    }, function errorCallback(response) {
      console.log("Error occurred in Async Call: " + response);
      return [];
    });
  }

  var itms = service.getItemsForCategory = function (categoryShortName) {
    console.log("before http call");
    console.log(ApiBasePath + "/menu_items.json?category=" + categoryShortName);
    return $http({
      method: 'GET',
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: categoryShortName
      }
    }).then(function (result) {
      return result.data.menu_items;
    }, function errorCallback(response) {
      console.log("Error occurred in Async Call: " + response);
      return [];
    });
  };
} // MenuDataService ends
})();
