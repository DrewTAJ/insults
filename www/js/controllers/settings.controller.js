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