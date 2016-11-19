(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MenuService', 'ApiPath'];
function MyInfoController(MenuService, ApiPath){
  var myinfoCtrl = this;

  myinfoCtrl.hasUserSignedUp = MenuService.hasUserSignedUp;
  myinfoCtrl.user = MenuService.user;
  myinfoCtrl.ApiPath = ApiPath;

  /*
  * Ideal case: it should be loaded from the server via http call through service
  * in this case, since we have already loaded the item at sign-up time, we are utilizing it via service
  */
  myinfoCtrl.menuItem = MenuService.menuItem;
}
})();
