(function () {
'use strict';

angular.module('data')
.controller('MainItemsListController', MainItemsListController);

MainItemsListController.$inject = ['itms'];
function MainItemsListController(itms) {
  var mainItemList = this;
  mainItemList.itms = itms;
}

})();
