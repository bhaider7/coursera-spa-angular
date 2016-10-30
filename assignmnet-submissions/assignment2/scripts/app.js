(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController )
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  /////////////////////////////////////////////////////////////////////////////
  // List #1 - To Buy - Controller
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;
    toBuyList.items = ShoppingListCheckOffService.getItemsToBuy();

    toBuyList.setBought = function(item){
      ShoppingListCheckOffService.markItemAsBought(item);
    };
  }

  /////////////////////////////////////////////////////////////////////////////
  // List #2 - Already Bought - Controller
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var alreadyBoughtList = this;
    alreadyBoughtList.items = ShoppingListCheckOffService.getItemsAlreadyBought();
  }

  /////////////////////////////////////////////////////////////////////////////
  // service
  function ShoppingListCheckOffService() {
    var service = this;

    // variables
    
    var itemListAlreadyBought =[];
    var itemListToBuy = [
      { name: "cupcakes", quantity: 9 },
      { name: "donuts", quantity: 7 },
      { name: "eclairs", quantity: 2 },
      { name: "honeycombs", quantity: 3 },
      { name: "kitKats", quantity: 4 },
      { name: "lollipops", quantity: 5 },
      { name: "marshmallows", quantity: 6 }
    ];

    // methods local to service

    function removeItemFromBuyList (itemIndex){
      itemListToBuy.splice(itemIndex, 1);
    }
    function addItemToBoughtList (item){
      itemListAlreadyBought.push(item);
    };

    // exposed methods

    service.getItemsToBuy = function () {
      return itemListToBuy;
    };
    service.getItemsAlreadyBought = function functionName() {
      return itemListAlreadyBought;
    };

    service.markItemAsBought = function (item){
      var itemIndex = itemListToBuy.indexOf(item);
      addItemToBoughtList(item);
      removeItemFromBuyList(itemIndex);
    };
  }
})();
