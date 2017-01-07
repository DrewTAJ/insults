// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    //if(!localStorage.getItem("insults")) {
      
    //}
  });
});
function routeConfig($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('tabs', {
      url: '/tab',
      abstract:true,
      templateUrl:'templates/tabs.html'
    })

    .state('tabs.generator', {
      url: '/generator',
      views: {
        'generator-tab': {
          templateUrl: 'templates/home.html',
          controller: 'MainCtrl',
          controllerAs: 'vm'  
        }
      }
    })

    .state('tabs.settings', {
      url: '/settings',
      views: {
        'settings-tab': {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('tabs.insults', {
      url: '/insults/:index',
      views: {
        'settings-tab': {
          templateUrl: 'templates/insult-list.html',
          controller: 'InsultsCtrl',
          controllerAs: 'vm'
        }
      }
    })

    .state('tabs.insult', {
      url: '/insults/:index/:id',
      views: {
        'settings-tab': {
          templateUrl: 'templates/insult.html',
          controller:'InsultCtrl',
          controllerAs: 'vm'
        }
      }
    });

    $urlRouterProvider.otherwise('/tab/generator');
    $urlRouterProvider.when('/tab','/tab/generator')
}

angular.module('app').config(routeConfig);
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
function MainCtrl($ionicPopup,$ionicPopover,$scope,$rootScope) {

  var vm = this;
  vm.insult = "Generate an Insult!";
  vm.popover;

  if(!localStorage.getItem("insults")) {
    var insult1 = ['Lazy','Stupid','Insecure','Idiotic','Slimy','Slutty','Smelly','Pompous','Communist','Dicknose','Pie-eating','Racist','Elitist','White Trash','Drug-loving','Tone Deaf','Ugly','Creepy','Crusty','Decrepic','Moronic','Greasy','Poxy','Putrid','Shitty','Assinine','Sickening'].sort();
    var insult2 = ['Douche','Ass','Turd','Rectum','Butt','Cock','Shit','Crotch','Bitch','Prick','Slut','Taint','Fuck','Dick','Boner','Shart','Nut','Sphincter','Shit-Kicking','Monkey-Licking','Butt-Munching','Crotch-Sniffing','Donkey-Spanking','Fashion-Illiterate','Worm-Ridden','Grub-Fucking','Lathered-Up','Panty-Waisted','Snot-Flicking','Fart-Eating'].sort();
    var insult3 = ['Hemorrhoid','Asshole','Scumbucket','Toerag','Hackwack','Imbecile','Stunodigan','Maggot','Hipster','Garbage','Jerkstore','Pilot','Canoe','Captain','Pirate','Hammer','Knob','Box','Jockey','Nazi','Waffle','Goblin','Blossum','Biscuit','Clown','Socket','Monster','Hound','Dragon','Balloon','Von Clown Stick'].sort();
    var insults = [insult1,insult2,insult3];
    localStorage.setItem("insults",JSON.stringify(insults));
  }

  vm.insults = JSON.parse(localStorage.getItem("insults"));

  if(typeof vm.insults == 'Array') {
    alert(vm.insults[0][0]);
  }

  vm.generateInsult = function() {
    var string = "";
    try {
      for(var i = 0; i < vm.insults.length; i++) {
        var insultIndex = Math.floor(Math.random() * vm.insults[i].length);
        string += vm.insults[i][insultIndex]+" ";
      }
    } catch(err) {
      alert(err);
    }
    vm.insult = string;
  }

//  console.log(vm.generateInsult());

  vm.showMessage = function() {
     var alertPopup = $ionicPopup.alert({
     title: 'Hi Mom!',
     template: 'Your real present has not showed up yet. In the mean time I hope you enjoy this Insult Generator!',
     buttons: [
       { text: 'Dismiss', type:'button-positive' }
     ] 
     });
   }

   vm.copyToClipboard = function($event) {
      if(window.cordova && window.cordova.plugins.Keyboard) {
          if(cordova.plugins.clipboard) {
            try {
                cordova.plugins.clipboard.copy(vm.insult);
                window.plugins.toast.show('Insult copied to clipboard', 'long', 'center', 
                    function(a){
                        console.log('toast success: ' + a)
                    }, 
                    function(b){
                        alert('toast error: ' + b)
                    }
                );
            //   $cordovaClipboard
            //     .copy(vm.insult)
            //     .then(function () {
            //       // success
            //     }, function (err) {
            //       // error
            //       alert(err);
            //     });
                //cordova.plugins.clipboard.copy(vm.insult);
            } catch (err) {
                alert(err);
                window.plugins.toast.show('Insult could not be copied to clipboard', 'long', 'center', 
                    function(a){
                        console.log('toast success: ' + a)
                    }, 
                    function(b){
                        alert('toast error: ' + b)
                    }
                );
            }
          }
      } else {
          var copyTextarea = document.querySelector('#js-copytextarea');
          copyTextarea.select();

          try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
            vm.openPopover($event);
          } catch (err) {
            console.log('Oops, unable to copy');
          }
      }
    }

    vm.openPopover = function($event) {
      vm.popover.show($event);
    };
    
    $rootScope.$on('updateInsults',function(event, obj) {
        vm.insults = JSON.parse(localStorage.getItem("insults"));
    });
}

angular.module("app")
    .controller("MainCtrl",MainCtrl);
function SettingsCtrl($ionicPopup, InsultService) {

  var vm = this;
  vm.restoreInsult = function() {
    var insult1 = ['Lazy','Stupid','Insecure','Idiotic','Slimy','Slutty','Smelly','Pompous','Communist','Dicknose','Pie-eating','Racist','Elitist','White Trash','Drug-loving','Tone Deaf','Ugly','Creepy','Crusty','Decrepic','Moronic','Greasy','Poxy','Putrid','Shitty','Assinine','Sickening'].sort();
    var insult2 = ['Douche','Ass','Turd','Rectum','Butt','Cock','Shit','Crotch','Bitch','Prick','Slut','Taint','Fuck','Dick','Boner','Shart','Nut','Sphincter','Shit-Kicking','Monkey-Licking','Butt-Munching','Crotch-Sniffing','Donkey-Spanking','Fashion-Illiterate','Worm-Ridden','Grub-Fucking','Lathered-Up','Panty-Waisted','Snot-Flicking','Fart-Eating'].sort();
    var insult3 = ['Hemorrhoid','Asshole','Scumbucket','Toerag','Hackwack','Imbecile','Stunodigan','Maggot','Hipster','Garbage','Jerkstore','Pilot','Canoe','Captain','Pirate','Hammer','Knob','Box','Jockey','Nazi','Waffle','Goblin','Blossum','Biscuit','Clown','Socket','Monster','Hound','Dragon','Balloon','Von Clown Stick'].sort();
    var insults = [insult1,insult2,insult3];
    localStorage.setItem("insults",JSON.stringify(insults));
    InsultService.updateInsults();
    $ionicPopup.show({
      template:'<p>Insults have been set to the default</p>',
      title:'Insults Reset',
      buttons: [
        { text: 'Dismiss', type:'button-positive'}
      ]
    });
  }
}

angular.module('app')
    .controller('SettingsCtrl',SettingsCtrl);
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