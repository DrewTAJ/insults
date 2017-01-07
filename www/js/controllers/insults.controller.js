function InsultsCtrl($scope, $stateParams, $ionicModal, $rootScope, InsultService) {
  console.log("in insults ctrl");
  var vm = this;
  vm.index = $stateParams.index;
  vm.insults = JSON.parse(localStorage.getItem("insults"))[$stateParams.index].sort();
  vm.modal;

  $ionicModal.fromTemplateUrl('templates/add-insult.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    vm.modal = modal;
  });

  vm.deleteInsult = function(index) {
    var storage = JSON.parse(localStorage.getItem("insults"));
    storage[vm.index].sort().splice(index,1);
    
    localStorage.setItem("insults",JSON.stringify(storage));
    vm.insults = storage[vm.index].sort();
    InsultService.updateInsults();
  }

  vm.openModal = function() {
    vm.modal.show();
  };

  vm.closeModal = function() {
    vm.modal.hide();
  };

  vm.createInsult = function(insult) {

    var storage = JSON.parse(localStorage.getItem("insults"));
    var insultIndex = storage[vm.index].find(
      function(list,item) {
        return list.toLowerCase() === insult.toLowerCase();    
      }
    );

    if(insultIndex) {
      vm.errorMessage = "Insult exists";
    } else {
      storage[vm.index].push(insult);
      localStorage.setItem("insults",JSON.stringify(storage));
      vm.insults = storage[vm.index].sort();
      InsultService.updateInsults();
      console.log("created insult",insult);
      vm.modal.hide();
    }
  }

  $rootScope.$on("updateColumn",function(event, obj) {
      vm.insults = JSON.parse(localStorage.getItem("insults"))[$stateParams.index].sort();
  });
}

angular.module('app')
    .controller('InsultsCtrl',InsultsCtrl);