
kw.CameraAnimationHandler = function(camera) {
    this.camera = camera;

    //attributes to moveAnimation
    this.from = new THREE.Vector3();
    this.to = new THREE.Vector3();
    this.distance = new THREE.Vector3();
    this.moveWeight = 0;
    this.upFrom = new THREE.Vector3();
    this.upTo = new THREE.Vector3();
    this.upDistance = new THREE.Vector3();
    this.moveAnimationEnabled = false;

    //attributes to rotateAnimation
    this.angle = 0;
    this.ballPosition = new THREE.Vector3();
    this.direction = new THREE.Vector3();
    this.face = new THREE.Vector3();
    this.rotWeight = 0;
    this.rotateAnimationActive = false;
};
/*
kw.CameraAnimationHandler.prototype.startAnimation = function(to) {
    this.from = this.camera.position.clone();
    this.to = to.clone();
    this.cameraAnimationEnabled = true;
    this.weight = 0;
    this.distance.subVectors(this.to,this.from);
};*/
/*
kw.CameraAnimationHandler.prototype.update = function(delta) {
    if(this.cameraAnimationEnabled) {
        this.weight += delta*4;
        if(this.weight < 1) {
            this.camera.position = this.from.clone().add(this.distance.clone().multiplyScalar(this.weight));
            this.camera.up = this.camera.position.clone()
                .sub(this.ballView.position)
                .normalize()
                .cross(this.direction.getBallRollRotationAxis());
            this.camera.lookAt(this.ballView.position);
        }
        else {
            this.camera.position = this.to;
            this.camera.lookAt(this.ballView.position);
            this.cameraAnimationEnabled = false;
        }
        return true;
    }
    else {
        return false;
    }
};*/


kw.CameraAnimationHandler.prototype.updateMove = function(delta) {
    if(this.moveAnimationEnabled) {
        //TODO camera move animation and delete this shit below
   /*     this.camera.moveTo(this.to,this.upTo);
        this.moveAnimationEnabled = false;*/





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




    }
};

kw.CameraAnimationHandler.prototype.updateRotation = function(delta) {
    if(this.rotateAnimationActive) {
        //TODO camera rotate animation
       /* var pos = this.ballPosition.clone().add(kw.tools.changeXComponentInVector(this.direction).multiplyScalar(-1).applyAxisAngle(this.face,this.angle).add(this.face));
        this.rotateAnimationActive = false;
        this.camera.moveTo(pos);*/





        delta *= 2;
        if(this.rotWeight+delta < 1) {
            this.rotWeight+=delta;
            var pos = this.ballPosition.clone().add(kw.tools.changeXComponentInVector(this.direction).multiplyScalar(-3).applyAxisAngle(kw.tools.changeXComponentInVector(this.face),this.angle*this.rotWeight).add(kw.tools.changeXComponentInVector(this.face).clone().multiplyScalar(2)));
            this.camera.moveTo(pos);
        }
        else {
            this.rotWeight = 1;
            var pos = this.ballPosition.clone().add(kw.tools.changeXComponentInVector(this.direction).multiplyScalar(-3).applyAxisAngle(kw.tools.changeXComponentInVector(this.face),this.angle*this.rotWeight).add(kw.tools.changeXComponentInVector(this.face).clone().multiplyScalar(2)));
            this.camera.moveTo(pos);
            this.rotateAnimationActive = false;
            kw.keyHandler.rotateAnimationDone();
        }






    }
};