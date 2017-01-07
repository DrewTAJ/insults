function InsultService($rootScope) {
  var service = this;

  service.insults = JSON.parse(localStorage.getItem("insults"));

  service.deleteInsult = function(index) {
    var storage = JSON.parse(localStorage.getItem("insults"));
    storage[vm.index].sort().splice(index,1);
    localStorage.setItem("insults",JSON.stringify(storage));
    vm.insults = storage[vm.index].sort();
  }

  service.updateInsults = function() {
      service.insults = JSON.parse(localStorage.getItem("insults"));
      $rootScope.$broadcast("updateInsults");
  }

  service.createInsult = function() {

  }
}

angular.module('app')
    .service('InsultService',InsultService);