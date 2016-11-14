(function () {
'use strict';

angular.module('data')
.controller('MainCategoriesListController', MainCategoriesListController);

MainCategoriesListController.$inject = ['ctgrs'];
function MainCategoriesListController(ctgrs) {
  var mainCatList = this;
  mainCatList.ctgrs = ctgrs;
}

})();
