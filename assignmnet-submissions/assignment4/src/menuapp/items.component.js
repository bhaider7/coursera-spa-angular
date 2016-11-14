(function () {
'use strict';

angular.module('data')
.component('items', {
  restrict: 'E',
  templateUrl: 'src/menuapp/templates/items.template.html',
  bindings: {
    itms: '<'
  }
});

})();
