
kw.CameraAnimationHandler = function(camera) {
    this.camHandler = camera;

    //attributes to moveAnimation
    this.from = new THREE.Vector3();
    this.to = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.fullPath = new THREE.Vector3();
    this.pathDone = 0;
    this.upFrom = new THREE.Vector3();
    this.upTo = new THREE.Vector3();
    this.upDistance = new THREE.Vector3();
    this.moveAnimationActive = false;

    //attributes to rotateAnimation
    this.angle = 0;
    this.ballPosition = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.face = new THREE.Vector3();
    this.rotWeight = 0;
    this.rotateAnimationActive = false;
};

kw.CameraAnimationHandler.prototype.updateMove = function(delta) {
    /*if(this.moveAnimationEnabled) {
        delta *= 4;
        if(this.moveWeight+delta < 1) {
            this.moveWeight += delta;
            var pos = this.from.clone().add(this.distance.clone().multiplyScalar(this.moveWeight));
            var up = this.upFrom.clone().add(this.upDistance.clone().multiplyScalar(this.moveWeight));
            this.camera.moveTo(pos,up);
        }
        else {
            this.moveWeight = 1;
            this.camera.moveTo(this.to,this.upTo);
            this.moveAnimationEnabled = false;
        }
    }*/




    if(this.moveAnimationActive) {
        if(this.pathDone + this.velocity.velocityLength*delta < this.fullPath.pathLength) {
            this.pathDone += this.velocity.velocityLength*delta;
            this.camHandler.camera.position.add(this.velocity.clone().multiplyScalar(delta));
            this.camHandler.camera.up = this.upFrom.clone().add(this.upDistance.clone().multiplyScalar(this.pathDone/this.fullPath.pathLength));
            this.camHandler.camera.lookAt(this.camHandler.ballView.position);
        }
        else {
            var newDelta = (this.pathDone-this.fullPath.pathLength)/this.velocity.velocityLength+delta;
            this.camHandler.camera.position.add(this.velocity.clone().multiplyScalar(delta - newDelta));
            this.camHandler.camera.up = this.upTo.clone();
            this.camHandler.camera.lookAt(this.camHandler.ballView.position);
            this.moveAnimationActive = false;
        }
    }




};

kw.CameraAnimationHandler.prototype.updateRotation = function(delta) {
    if(this.rotateAnimationActive) {
        delta *= 2;
        if(this.rotWeight+delta < 1) {
            this.rotWeight+=delta;
            var pos = this.ballPosition.clone().add(kw.tools.changeXComponentInVector(this.direction).multiplyScalar(-4).applyAxisAngle(kw.tools.changeXComponentInVector(this.face),this.angle*this.rotWeight).add(kw.tools.changeXComponentInVector(this.face).clone().multiplyScalar(4)));
            this.camHandler.camera.position = pos;
            this.camHandler.camera.lookAt(this.camHandler.ballView.position);
        }
        else {
            this.rotWeight = 1;
            var pos = this.ballPosition.clone().add(kw.tools.changeXComponentInVector(this.direction).multiplyScalar(-4).applyAxisAngle(kw.tools.changeXComponentInVector(this.face),this.angle*this.rotWeight).add(kw.tools.changeXComponentInVector(this.face).clone().multiplyScalar(4)));
            this.camHandler.camera.position = pos;
            this.camHandler.camera.lookAt(this.camHandler.ballView.position);
            this.rotateAnimationActive = false;
            kw.keyHandler.rotateAnimationDone();
        }
    }
};