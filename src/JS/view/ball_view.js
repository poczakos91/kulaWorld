/**
 *
 * @constructor
 * @extends THREE.Mesh
 */
kw.BallView = function(radius,color,opt_texture) {
    this.originalColor = color;
    this.originalRadius = radius;

    this.sphereGeometry = new THREE.SphereGeometry(radius,20,20);
    if(opt_texture.colorMapURL) {
        var ballTexture = THREE.ImageUtils.loadTexture(opt_texture.colorMapURL);
        this.ballMaterial = new THREE.MeshPhongMaterial({map: ballTexture});
    }
    else {
        this.ballMaterial = new THREE.MeshPhongMaterial({"color": color});
    }
    THREE.Mesh.call(this,this.sphereGeometry,this.ballMaterial);
};
kw.BallView.prototype = Object.create(THREE.Mesh.prototype);

kw.BallView.prototype.setPosition = function(cube,face) {
    var newPos = cube.position.clone();
    newPos.add(kw.tools.invertedFaceMap[face].clone().multiplyScalar(0.5+this.originalRadius));
    this.position.set(newPos.x,newPos.y,newPos.z);
};

kw.BallView.prototype.setPositionWithAnimation = function(cube,face) {
    var newPos = cube.position.clone();
    newPos.add(kw.tools.invertedFaceMap[face].clone().multiplyScalar(0.5+this.originalRadius));
    kw.animationHandler.startMoveAnimation(this.position,newPos);
};