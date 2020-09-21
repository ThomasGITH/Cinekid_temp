AFRAME.registerComponent('modify-materials', {
    init: function () {
      // Wait for model to load.
      this.el.addEventListener('model-loaded', () => {
        // Grab the mesh / scene.
        const obj = this.el.getObject3D('mesh');
        // Go over the submeshes and modify materials we want.
        obj.traverse(function(node){
          if (node.isMesh){                           
              //node.material.color=new THREE.Color(0x66cc22);
              node.material.map =  new THREE.TextureLoader().load( "patch_wave/scale_test/Mat_baseColor2.png");
          }
        });
      });
    }
});