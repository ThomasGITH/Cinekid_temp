/*
HOW TO USE:
- put "cursor='rayOrigin: mouse'" on the camera
- put "raycaster="objects: .collidable"" on the camera (here you can choose which classes the raycaster will interact with)
- put "class="collidable"" on a entity that you want to interact with the raycaster
- put "cursor-listener" on the entity that you want to be clicking on
*/

AFRAME.registerComponent('cursor-listener', {
  init: function () {
    SetupAudioSystem(`audio/`);
    PreloadSound("test", "audio.mp3");
    this.el.addEventListener('click', function (evt) {
      // on click, do something here
      PlaySound("test");
    });
  }
});


