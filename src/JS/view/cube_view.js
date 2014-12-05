/**
 *
 * @constructor
 * @extends THREE.Mesh
 */
kw.CubeView = function(position,size,color) {
    this.originalColor = color;
    this.originalSize = size;
    this.originalPosition = position;

    this.cubeGeometry = new THREE.CubeGeometry(size,size,size);
    this.cubeMaterial = new THREE.MeshPhongMaterial({"color": color});
    THREE.Mesh.call(this,this.cubeGeometry,this.cubeMaterial);

    this.position.set(position.x,position.y,position.z);

};
kw.CubeView.prototype = Object.create(THREE.Mesh.prototype);
