
kw.CameraHandler = function() {

    //create camera and set its initial position
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.camera.position.x = -7;
    this.camera.position.y = 7;
    this.camera.position.z = -10;
    this.camera.lookAt(new THREE.Vector3(0,1,0));
    this.firstPersonAnimation = new kw.CameraAnimationHandler(this);

    //init trackball control
    this.trackballControl = new THREE.TrackballControls(this.camera);
    this.trackballControl.noZoom = false;
    this.trackballControl.noPan = true;
    this.trackballControl.rotateSpeed = 3.0;
    this.trackballControl.zoomSpeed = 10.0;
    this.trackballControl.staticMoving = true;
    this.trackballControl.maxDistance = 50;
    this.trackballControl.minDistance = 5;
};

kw.CameraHandler.prototype.addBallView = function(ballView) {
    this.ballView = ballView;
};
/*
kw.CameraHandler.prototype.switchControl = function() {
    if(!this.trackballControl.enabled) {
        this.trackballControl.enabled = true;
        this.camera.position.x = -7;
        this.camera.position.y = 7;
        this.camera.position.z = -10;
        this.camera.up.set(0,1,0);
        this.camera.lookAt(new THREE.Vector3(0,1,0));
    }
    else {
        this.trackballControl.enabled = false;
        this.camera.position = this.ballView.position.clone().add(kw.tools.changeXComponentInVector(this.direction.direction).multiplyScalar(-3).add(kw.tools.changeXComponentInVector(this.direction.faceDirection).multiplyScalar(3)));
        this.camera.up = this.ballView.position.clone().sub(this.camera.position).cross(this.actFace.clone().cross(kw.tools.changeXComponentInVector(this.direction.direction))).normalize();
        this.camera.lookAt(this.ballView.position);
    }
};

kw.CameraHandler.prototype.updateCamera = function(delta) {
    if(this.trackballControl.enabled) {
        this.trackballControl.update(delta);
    }
    else {
        if(!this.firstPersonAnimation.update(delta)) {

            this.camera.position = this.ballView.position.clone().add(kw.tools.changeXComponentInVector(this.direction.direction).multiplyScalar(-3).add(kw.tools.changeXComponentInVector(this.direction.faceDirection).multiplyScalar(3)));
            this.camera.up = this.ballView.position.clone().sub(this.camera.position).cross(this.actFace.clone().cross(kw.tools.changeXComponentInVector(this.direction.direction))).normalize();
            this.camera.lookAt(this.ballView.position);
        }
    }
};

kw.CameraHandler.prototype.positionChanged = function(cube,face) {
    var to = cube.position.clone();
    this.actFace = kw.tools.invertedFaceMap[face];
    to.add(kw.tools.invertedFaceMap[face].clone().multiplyScalar(0.5+this.ballView.originalRadius));
    to.add(kw.tools.changeXComponentInVector(this.direction.direction).multiplyScalar(-3).add(kw.tools.changeXComponentInVector(this.direction.faceDirection).multiplyScalar(3)));

    this.firstPersonAnimation.startAnimation(to);
};

kw.CameraHandler.prototype.rotationChanged = function(angle) {

};*/

kw.CameraHandler.prototype.startMove = function (settings) {
/*    this.firstPersonAnimation.from = this.camera.position.clone();
    if (settings.faceFrom.equals(settings.faceTo)) {
        this.firstPersonAnimation.to = settings.ballPosFrom.clone().add(kw.tools.changeXComponentInVector(settings.faceFrom).clone().multiplyScalar(4)).sub(kw.tools.changeXComponentInVector(settings.ballDirFrom).clone().multiplyScalar(4));
    }
    else {
        this.firstPersonAnimation.to = settings.ballPosFrom.clone().add(kw.tools.changeXComponentInVector(settings.faceFrom).clone().multiplyScalar(4)).add(kw.tools.changeXComponentInVector(settings.faceTo).clone().multiplyScalar(4));
    }
    this.firstPersonAnimation.distance.subVectors(this.firstPersonAnimation.to, this.firstPersonAnimation.from);
    this.firstPersonAnimation.moveWeight = 0;
    this.firstPersonAnimation.upFrom = kw.tools.changeXComponentInVector(settings.faceFrom);
    this.firstPersonAnimation.upTo = kw.tools.changeXComponentInVector(settings.faceTo);
    this.firstPersonAnimation.upDistance.subVectors(this.firstPersonAnimation.upTo, this.firstPersonAnimation.upFrom);
    this.firstPersonAnimation.moveAnimationEnabled = true;*/


    this.firstPersonAnimation.from = this.camera.position.clone();
    if (settings.faceFrom.equals(settings.faceTo)) {
        this.firstPersonAnimation.to = settings.ballPosTo.clone().add(kw.tools.changeXComponentInVector(settings.faceFrom).clone().multiplyScalar(3)).sub(kw.tools.changeXComponentInVector(settings.ballDirFrom).clone().multiplyScalar(3));
    }
    else {
        this.firstPersonAnimation.to = settings.ballPosFrom.clone().add(kw.tools.changeXComponentInVector(settings.faceFrom).clone().multiplyScalar(3)).add(kw.tools.changeXComponentInVector(settings.faceTo).clone().multiplyScalar(3));
    }
    this.firstPersonAnimation.velocity.subVectors(this.firstPersonAnimation.to, this.firstPersonAnimation.from);
    var duration = this.ballView.ballAnimation.path1.pathLength/this.ballView.ballAnimation.velocity1.velocityLength + this.ballView.ballAnimation.path2.pathLength/this.ballView.ballAnimation.velocity2.velocityLength;
    this.firstPersonAnimation.velocity.multiplyScalar(1/duration);
    this.firstPersonAnimation.velocity.velocityLength = this.firstPersonAnimation.velocity.length();

    this.firstPersonAnimation.fullPath.subVectors(this.firstPersonAnimation.to, this.firstPersonAnimation.from);
    this.firstPersonAnimation.fullPath.pathLength = this.firstPersonAnimation.fullPath.length();

    this.firstPersonAnimation.pathDone = 0;

    var crossVec = new THREE.Vector3();
    crossVec.crossVectors(settings.faceFrom,settings.faceTo);
    this.firstPersonAnimation.upFrom = kw.tools.changeXComponentInVector(settings.faceFrom);
    this.firstPersonAnimation.upTo = kw.tools.changeXComponentInVector(settings.faceTo);
    this.firstPersonAnimation.upDistance.subVectors(this.firstPersonAnimation.upTo, this.firstPersonAnimation.upFrom);
    this.firstPersonAnimation.moveAnimationActive = true;



};

kw.CameraHandler.prototype.startRotate = function (settings,angle) {
    this.firstPersonAnimation.angle = angle;
    this.firstPersonAnimation.ballPosition = settings.ballPos;
    this.firstPersonAnimation.direction = settings.ballDirFrom;
    this.firstPersonAnimation.face = settings.face;
    this.firstPersonAnimation.rotWeight = 0;
    this.firstPersonAnimation.rotateAnimationActive = true;
};

kw.CameraHandler.prototype.update = function(delta) {
    if(this.trackballControl.enabled) {
        this.trackballControl.update(delta);
    }
    else {
        this.firstPersonAnimation.updateMove(delta);
        this.firstPersonAnimation.updateRotation(delta);
    }
};

kw.CameraHandler.prototype.changeToTrackBallControl = function(opt_pos) {
    if(!opt_pos) {
        this.camera.position.x = -7;
        this.camera.position.y = 7;
        this.camera.position.z = -10;
        this.camera.lookAt(new THREE.Vector3(0, 1, 0));
        this.trackballControl.enabled = true;
    }
    else {
        this.camera.position.x = opt_pos.x;
        this.camera.position.y = opt_pos.y;
        this.camera.position.z = opt_pos.z;
        this.camera.lookAt(new THREE.Vector3(0, 1, 0));
        this.camera.up = new THREE.Vector3(0,1,0);
        this.trackballControl.enabled = true;
    }
};

kw.CameraHandler.prototype.changeToFirstPersonControl = function (settings) {
    var pos = settings.ballPos.sub(kw.tools.changeXComponentInVector(settings.ballDir).multiplyScalar(4)).add(kw.tools.invertedFaceMap[settings.faceString].clone().multiplyScalar(4));
    this.camera.position.set(pos.x,pos.y,pos.z);
    this.camera.up = kw.tools.changeXComponentInVector(settings.face);
    this.camera.lookAt(this.ballView.position);
};
/*
kw.CameraHandler.prototype.moveTo = function(to, opt_up) {
    this.camera.position.add(to);
    if(opt_up) {
        this.camera.up = opt_up;
    }
    this.camera.lookAt(this.ballView.position);
};*/