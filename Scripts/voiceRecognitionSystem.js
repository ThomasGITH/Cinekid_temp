var wordList = [];
var badWordList =["hoer","whoer","kanker","homo","m******","fuck","k**","facq"]
var color = ["#808080","#ff0000","#ffff00", "#0000ff", "#00ff00"];
var colorCalc = "rgb("+(wordList.length * 25)+","+0+","+0+")";
var colorCount = 0;
var x = wordList.toString();
var badWord = false;
var goodWord = false;
var woordInt = 0;
var r = 0;
document.getElementById("demo").innerHTML = x;

AFRAME.registerComponent('change-color', {
        tick: function () {
          var el = this.el;  // <a-box>
          elDefaultColor = el.getAttribute('color');
          // Add event listeners here.
          el.setAttribute('color', colorCalc);
          if(badWord == true){
            console.log(woordInt);
            if(woordInt < 0){
              woordInt = 0;
            } 
            else if(woordInt > 0){
            el.setAttribute('animation', "property: components.material.material.color; type: color; from: rgb("+(woordInt * 25)+","+0+","+0+"); to: rgb("+((woordInt-1) * 25)+","+0+","+0+"); dur: 500; dir: alternate; loop: false");
              woordInt--;
            }
            badWord = false;
          }
          if(goodWord == true){
            woordInt++;
          el.setAttribute('animation', "property: components.material.material.color; type: color; from: rgb("+((woordInt-1) * 25)+","+0+","+0+"); to: rgb("+(woordInt * 25)+","+0+","+0+"); dur: 500; dir: alternate; loop: false");
          goodWord = false;
        }
      }
      });


function listening() {

  annyang.setLanguage('nl-NL');

if (annyang) {

  // Let's define a command.
  var commands = {
    ':variable': function(variable) {
      if(wordList.indexOf(variable) === -1 && badWordList.indexOf(variable) === -1)
      {
        goodWord = true;
        wordList.push(variable);
        x = wordList.toString();
        document.getElementById("demo").innerHTML = x;     
    }
    else if(badWordList.indexOf(variable) !== -1)
    {
      badWord = true;
    }
    }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening.
  annyang.start();
}
}
listening();
