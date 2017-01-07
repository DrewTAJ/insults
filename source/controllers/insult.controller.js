function InsultCtrl($stateParams, $ionicHistory, InsultService, $rootScope) {
  var vm = this;
  console.log("in insult controller");
  vm.insults = JSON.parse(localStorage.getItem("insults"))[$stateParams.index];
  vm.insult = JSON.parse(localStorage.getItem("insults"))[$stateParams.index][$stateParams.id];

  vm.submit = function() {
    vm.insults[$stateParams.id] = vm.insult;
    var insults = [];

    for(var i = 0; i < InsultService.insults.length; i++) {
        if(i == $stateParams.index) {
            insults.push(vm.insults);
        } else {
            insults.push(InsultService.insults[i]);
        }
    }

    localStorage.setItem("insults",JSON.stringify(insults));
    InsultService.updateInsults();
    $rootScope.$broadcast("updateColumn");
    $ionicHistory.goBack();
  }

}

angular.module('app')
    .controller('InsultCtrl',InsultCtrl);