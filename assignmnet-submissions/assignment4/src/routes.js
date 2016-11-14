(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', { // Home Page
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })
  .state('categories', { // Categories View
    url: '/categories',
    templateUrl: 'src/menuapp/templates/main-categorieslist.template.html',
    controller: 'MainCategoriesListController as mainCatList',
    resolve: {
      ctgrs: ['MenuDataService',
             function (MenuDataService) {
               return MenuDataService.getAllCategories();
             }]
    }
  })
  .state('items', { // Items View
    url: '/items/{catShtNm}',
    templateUrl: 'src/menuapp/templates/main-itemslist.template.html',
    controller: 'MainItemsListController as mainItemList',
    resolve: {
      itms: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.catShtNm);
            }]
    }
  });
} // RoutesConfig ends
})();
