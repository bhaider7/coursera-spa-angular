(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope', '$filter'];
  function LunchCheckController($scope, $filter){
    // scope variables
    $scope.lunchDetails = "";
    $scope.message = "";
    $scope.msgClass = "";
    $scope.textboxClass = "";

    $scope.checkLunch = function () { // button click handler
      //$scope.textboxClass = ""; // reset it
      // input validation
      if (!isItemNotBlank($scope.lunchDetails)) {
        $scope.msgClass = "errorText";
        $scope.textboxClass = "errorBorder";
        $scope.message = "Please enter data first";
        return;
      }

      var count = CalculateItems($scope.lunchDetails);
      // console.log(count); // un-comment for debugging if required

      $scope.message =  count < 4 ? "Enjoy!" : "Too much!";
      $scope.textboxClass = "successBorder";
      $scope.msgClass = "successText";
    };

    ///////////////////////////////////////////////////////////////////////////
    // function
    function CalculateItems(itemString){
      var itemCount = 0;
      var itemList = itemString.split(',');
      //doc for filter function:
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
      return itemList.filter(isItemNotBlank).length;
    }

    // if the obj does not statisfy the condition i.e. it is not a blank entry,
    // return true (which means it will be included)
    function isItemNotBlank(obj){
      return !(obj === null || obj.match(/^ *$/) !== null); // the regular expression has been used to capture the tabs also
    }
  }// controller end
})();
