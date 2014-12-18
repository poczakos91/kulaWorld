
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

    this.ballAnimation = new kw.BallAnimation(this);
};
kw.BallView.prototype = Object.create(THREE.Mesh.prototype);

kw.BallView.prototype.setPosition = function(cube,face) {
    var newPos = cube.position.clone();
    newPos.add(kw.tools.invertedFaceMap[face].clone().multiplyScalar(0.5+this.originalRadius));
    this.position.set(newPos.x,newPos.y,newPos.z);
};

kw.BallView.prototype.startMove = function(settings) {
    this.ballAnimation.from = settings.ballPosFrom;
    //console.log("ballposfrom: "+this.ballAnimation.from.x+" "+this.ballAnimation.from.y+" "+this.ballAnimation.from.z);
    this.ballAnimation.to = settings.ballPosTo;

    var specialCoordinateIndex = 0;
    for (var i = 0; i < 3; i++) {
        if (settings.ballDirFrom.getComponent(i) == 1 || settings.ballDirFrom.getComponent(i) == -1) {
            this.ballAnimation.breakpoint.setComponent(i, this.ballAnimation.to.getComponent(i));
            specialCoordinateIndex = i;
        }
        else {
            this.ballAnimation.breakpoint.setComponent(i, this.ballAnimation.from.getComponent(i));
        }
    }
    if(this.ballAnimation.breakpoint.equals(this.ballAnimation.to)) {
        var tempPath = new THREE.Vector3();
        tempPath.subVectors(this.ballAnimation.to,this.ballAnimation.from);
        this.ballAnimation.breakpoint = tempPath.multiplyScalar(0.5).add(this.ballAnimation.from);
    }

    this.ballAnimation.path1.subVectors(this.ballAnimation.breakpoint, this.ballAnimation.from);
    this.ballAnimation.path2.subVectors(this.ballAnimation.to, this.ballAnimation.breakpoint);
    this.ballAnimation.path1.pathLength = this.ballAnimation.path1.length();
    this.ballAnimation.path2.pathLength = this.ballAnimation.path2.length();
    this.ballAnimation.pathLength = this.ballAnimation.path1.pathLength + this.ballAnimation.path2.pathLength;
    this.ballAnimation.path2Active = false;

    this.ballAnimation.velocity1 = kw.tools.changeXComponentInVector(settings.ballDirFrom.clone()).multiplyScalar(kw.speed);//this.ballAnimation.path1.clone().normalize().multiplyScalar(2);
    this.ballAnimation.velocity1.velocityLength = this.ballAnimation.velocity1.length();
    this.ballAnimation.velocity2 = kw.tools.changeXComponentInVector(settings.ballDirTo.clone()).multiplyScalar(kw.speed);//this.ballAnimation.path2.clone().normalize().multiplyScalar(2);
    this.ballAnimation.velocity2.velocityLength = this.ballAnimation.velocity2.length();

    this.ballAnimation.rollRotationAxis = settings.rollRotAxis;
    this.ballAnimation.pathDone = 0;
    this.ballAnimation.moveAnimationActive = true;
};

kw.BallView.prototype.startRotate = function (settings, angle) {
    this.ballAnimation.fullRotAngle = angle;
    this.ballAnimation.actRotAngle = 0;
    this.ballAnimation.rotationAxis = kw.tools.invertedFaceMap[settings.faceString].clone();
    this.ballAnimation.rotateAnimationActive = true;
};

kw.BallView.prototype.update = function(delta) {
    this.ballAnimation.updateMove(delta);
    this.ballAnimation.updateRotation(delta);
};

kw.BallView.prototype.isAnimationActive = function () {
    return (this.ballAnimation.rotateAnimationActive || this.ballAnimation.moveAnimationActive);
};