(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService', 'ApiPath'];
function SignupController(MenuService, ApiPath){
  var signupCtrl = this;

  // button event
  signupCtrl.submit = function () {
    var promise = MenuService.getFavDish(signupCtrl.user.favdish);
    promise.then(function (response) {
      signupCtrl.data = response.data;
      signupCtrl.completed = true;
      signupCtrl.isError=!signupCtrl.completed;

      // now save the data in service
      MenuService.setUserInfo(signupCtrl.user);
    })
    .catch(function (error) {
      signupCtrl.isError=true;
      signupCtrl.completed = !signupCtrl.isError;

      // incase of error, clear it to resetthe previous data
      MenuService.setUserInfo();
   })

  };
}


})();
