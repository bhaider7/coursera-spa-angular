(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective);

  /////////////////////////////////////////////////////////////////////////////
  // Directive
  function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'directives/foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'menu',
      bindToController: true
    };
    return ddo;
  }

  /////////////////////////////////////////////////////////////////////////////
  // Controller
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var menu = this;
    menu.searchKeyword = ""; // linked with the input textbox
    menu.showMsg = false;

    menu.searchForItem = function(){

      if (menu.isItemBlank(menu.searchKeyword)){
        menu.showMsg = true;
        menu.found = []; // it is required to erase any previous data
        return;
      }

      var promise = MenuSearchService.getMatchedMenuItems(menu.searchKeyword);
      promise.then(function (response) {
        if (response.length === 0){
          menu.showMsg = true;
          menu.found = []; // it is required to erase any previous data
          return;
        } //else not needed
        menu.showMsg = false;
        menu.found = response;
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    };

    menu.removeItem = function(index){
      menu.found.splice(index, 1);
    };

    menu.isItemBlank = function(obj){
      // the regular expression has been used to capture the tabs also
      return (obj === null || obj.match(/^ *$/) !== null);
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  // Service
  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm){
      return $http({
        method: 'GET',
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (result) {
        var allItems = result.data.menu_items;
        var foundItems =[];

        angular.forEach(allItems, function(value) {
          if (value.description.toLowerCase().includes(searchTerm.toLowerCase())) {
            foundItems.push(value);
          }
        });
        return foundItems;
      }, function errorCallback(response) {
        console.log("Error occurred in Async Call: " + response);
        var foundItems =[];
        return foundItems;
      });
    };
  } // closing service

})();
