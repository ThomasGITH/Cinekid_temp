
var markerPositionZ;  // marker Z position

// getting Z position of the marker
AFRAME.registerComponent('marker-position-reader', {
  tick: function () {
	markerPositionZ = this.el.getAttribute('position').z;
  }
});

var cameraRotationX;  // camera X rotation
var cameraRotationY;  // camera Y rotation
var cameraRotationZ;  // camera Z rotation

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
  // Getting rotation data
  cameraRotationZ = event.alpha;
  cameraRotationX = event.beta;
  cameraRotationY = event.gamma;
}

var maxVisiblePosition = -5;  // max position on which the model is visible
var maxVisibleRotation = 80;  // max rotation on which the model is visible
var minVisibleRotation = 40;  // min rotation on which the model is visible

// checking when model should be visible
AFRAME.registerComponent('model', {
  tick: function() {
    if(markerPositionZ > maxVisiblePosition && cameraRotationX < maxVisibleRotation && cameraRotationX > minVisibleRotation){
	    this.el.object3D.visible = true;  // model is visible
	  }
	  else{
      this.el.object3D.visible = false;  // model is invisible
    }
  }
});