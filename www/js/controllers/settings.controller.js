function SettingsCtrl($ionicPopup, InsultService) {

  var vm = this;
  vm.restoreInsult = function() {
    var insult1 = ['Lazy','Stupid','Insecure','Idiotic','Slimy','Slutty','Smelly','Pompous','Communist','Dicknose','Pie-eating','Racist','Elitist','White Trash','Drug-loving','Tone Deaf','Ugly','Creepy'].sort();
    var insult2 = ['Douche','Ass','Turd','Rectum','Butt','Cock','Shit','Crotch','Bitch','Prick','Slut','Taint','Fuck','Dick','Boner','Shart','Nut','Sphincter'].sort();
    var insult3 = ['Pilot','Canoe','Captain','Pirate','Hammer','Knob','Box','Jockey','Nazi','Waffle','Goblin','Blossum','Biscuit','Clown','Socket','Monster','Hound','Dragon','Balloon','Von Clown Stick'].sort();
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