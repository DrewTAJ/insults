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