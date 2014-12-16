
kw.AnimationHandler = function(ball, direction) {
    this.ballView = ball;
    this.direction = direction;
    this.from = new THREE.Vector3();
    this.to = new THREE.Vector3();
    this.breakPoint = new THREE.Vector3(0,0,0);
    this.fullPath = new THREE.Vector3(0,0,0);
    this.path1 = new THREE.Vector3(0,0,0);
    this.path2 = new THREE.Vector3(0,0,0);
    this.straightMoveAnimationActive = false;
    this.moveAnimationActive = false;
    this.rotateAnimationActive = false;
    this.actualRotation = 0;
    this.rotationAngle = 0;
    this.enabledMovingToBreakpoint = false;
    this.weight = 0;
};

kw.AnimationHandler.prototype.startMoveAnimation = function(from, to) {
    this.from = from.clone();
    this.to = to.clone();

    //if 2 dimensions of fromt and to equals than the move is straight, no need for breakpoint
    var dimensionEqualityCounter = 0;
    for(var i=0;i<3;i++) {
        if(from.getComponent(i) == to.getComponent(i)) {
            dimensionEqualityCounter++;
        }
    }
    if(dimensionEqualityCounter == 2) {
        this.fullPath.subVectors(to,from);
        this.fullPath.pathLength = this.fullPath.length();
        this.straightMoveAnimationActive = true;
    }
    else {
        var dirTemp = kw.tools.directionMap[this.direction.getActualDirection()].clone();
        for(var i=0;i<3;i++) {
            if(dirTemp.getComponent(i) == 1 || dirTemp.getComponent(i) == -1) {
                this.breakPoint.setComponent(i,this.to.getComponent(i));
            }
            else {
                this.breakPoint.setComponent(i,this.from.getComponent(i));
            }
        }
        this.path1.subVectors(this.breakPoint,this.from);
        this.path2.subVectors(this.to,this.breakPoint);
        this.path1.pathLength = this.path1.length();
        this.path2.pathLength = this.path2.length();

        this.enabledMovingToBreakpoint = true;
        this.moveAnimationActive = true;
    }
    this.actualRotation = 0;
    this.weight = 0;
};

kw.AnimationHandler.prototype.startRotateAnimation = function(angle) {
    this.actualRotation = 0;
    this.rotationAngle = angle;
    this.rotateAnimationActive = true;
};

kw.AnimationHandler.prototype.update = function(delta) {
    if(this.moveAnimationActive) {
        this.updateMoveAnimation(delta);
    }
    if(this.rotateAnimationActive) {
        this.updateRotateAnimation(delta);
    }
    if(this.straightMoveAnimationActive) {
        this.updateStraightMoveAnimation(delta);
    }
};

kw.AnimationHandler.prototype.updateMoveAnimation = function(delta) {
    delta *= 4;
    if(this.path1.pathLength<0.5 ) delta*=3;
    if(this.enabledMovingToBreakpoint) {
        if (this.weight + delta < 1) {
            this.weight += delta;
            this.ballView.position.setX((this.path1.x * this.weight) + this.from.x);
            this.ballView.position.setY((this.path1.y * this.weight) + this.from.y);
            this.ballView.position.setZ((this.path1.z * this.weight) + this.from.z);
            this.updateRollRotateAnimation(delta,this.path1.pathLength);
        }
        else {
            this.ballView.position = this.breakPoint.clone();
            this.enabledMovingToBreakpoint = false;
            this.updateRollRotateAnimation(this.weight+delta-1,this.path1.pathLength);
            this.weight = 0;
        }
    }
    else {
        if(this.weight+delta < 1 && this.path2.pathLength>0.03) {
            this.weight += delta;
            this.ballView.position.setX((this.path2.x*this.weight)+this.breakPoint.x);
            this.ballView.position.setY((this.path2.y*this.weight)+this.breakPoint.y);
            this.ballView.position.setZ((this.path2.z*this.weight)+this.breakPoint.z);
            this.updateRollRotateAnimation(delta,this.path2.pathLength);
        }
        else {
            this.ballView.position = this.to.clone();
            this.updateRollRotateAnimation(this.weight+delta-1,this.path2.pathLength);
            this.moveAnimationActive = false;
            kw.keyHandler.moveAnimationDone();
        }
    }
};

kw.AnimationHandler.prototype.updateStraightMoveAnimation = function(delta) {
    delta *= 4;
    if(this.weight+delta < 1) {
        this.weight += delta;
        this.ballView.position.set(
            this.from.x + this.weight * this.fullPath.x,
            this.from.y + this.weight * this.fullPath.y,
            this.from.z + this.weight * this.fullPath.z
        );
        this.updateRollRotateAnimation(delta,this.fullPath.pathLength);
    }
    else {
        this.updateRollRotateAnimation(this.weight+delta-1,this.fullPath.pathLength);
        this.ballView.position.set(this.to.x,this.to.y,this.to.z);
        this.straightMoveAnimationActive = false;
        kw.keyHandler.moveAnimationDone();
    }
};

kw.AnimationHandler.prototype.updateRotateAnimation = function(delta) {
    var rotationDelta = this.rotationAngle*delta*2;
    var q = new THREE.Quaternion();
    if(Math.abs(this.rotationAngle) > Math.abs(this.actualRotation+rotationDelta)) {
        q.setFromAxisAngle(this.direction.getBallRotationAxis(),rotationDelta);
        this.ballView.quaternion.multiplyQuaternions(q,this.ballView.quaternion);
        this.direction.rotateDirection(rotationDelta);
    }
    else {
        rotationDelta = this.rotationAngle - this.actualRotation;
        q.setFromAxisAngle(this.direction.getBallRotationAxis(),rotationDelta);
        this.ballView.quaternion.multiplyQuaternions(q,this.ballView.quaternion);
        this.rotateAnimationActive = false;
        this.direction.rotateDirection(rotationDelta);
        this.direction.calculateRollRotationAxis();
        kw.keyHandler.rotateAnimationDone();
    }
    this.actualRotation += rotationDelta;
};

kw.AnimationHandler.prototype.updateRollRotateAnimation = function(delta,length) {
    var q = new THREE.Quaternion();
    q.setFromAxisAngle(this.direction.getBallRollRotationAxis(),-length*2*delta);
    this.ballView.quaternion.multiplyQuaternions(q,this.ballView.quaternion);
};

kw.AnimationHandler.prototype.isAnimationActive = function() {
    return this.moveAnimationActive || this.rotateAnimationActive || this.straightMoveAnimationActive;
};