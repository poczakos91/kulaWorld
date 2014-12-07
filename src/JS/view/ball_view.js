/**
 *
 * @constructor
 * @extends THREE.Mesh
 */
kw.BallView = function(position,radius,color,opt_texture) {
    this.originalColor = color;
    this.originalRadius = radius;
    this.originalPosition = position;

    this.sphereGeometry = new THREE.SphereGeometry(radius,20,20);
    this.ballMaterial = new THREE.MeshPhongMaterial({"color": color});
    THREE.Mesh.call(this,this.sphereGeometry,this.ballMaterial);

    this.position.set(position.x,position.y,position.z);

};
kw.BallView.prototype = Object.create(THREE.Mesh.prototype);

