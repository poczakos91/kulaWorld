
kw.BallAnimation = function(ballView) {
    this.ballView = ballView;

    //attributes for moveAnimation
    this.from = new THREE.Vector3();
    this.to = new THREE.Vector3();
    this.breakpoint = new THREE.Vector3();
    this.path1 = new THREE.Vector3();
    this.path2 = new THREE.Vector3();
    this.path1.pathLength = this.path1.length();
    this.path2.pathLength = this.path2.length();
    this.pathLength = this.path1.pathLength+this.path2.pathLength;
    this.path2Active = false;
    this.rollRotationAxis = new THREE.Vector3();
    this.moveWeight = 0;
    this.moveAnimationActive = false;

    //attributes for rotateAnimation
    this.fullRotAngle = 0;
    this.actRotAngle = 0;
    this.rotationAxis = new THREE.Vector3();
    this.rotateAnimationActive = false;
};

kw.BallAnimation.prototype.updateMove = function(delta) {
    if(this.moveAnimationActive) {
        delta *= 4;
        if(this.path1.pathLength<0.5 ) delta*=3;
        if(!this.path2Active) {
            if (this.moveWeight + delta < 1) {
                this.moveWeight += delta;
                this.ballView.position.set(
                    (this.path1.x * this.moveWeight) + this.from.x,
                    (this.path1.y * this.moveWeight) + this.from.y,
                    (this.path1.z * this.moveWeight) + this.from.z
                );
                this.updateRollRotation(delta,this.path1.pathLength);
            }
            else {
                this.ballView.position = this.breakpoint.clone();
                this.path2Active = true;
                this.updateRollRotation(1 - this.moveWeight,this.path1.pathLength);
                this.moveWeight = 0;
            }
        }
        else {
            if(this.moveWeight+delta < 1 && this.path2.pathLength>0.03) {
                this.moveWeight += delta;
                this.ballView.position.set(
                    (this.path2.x*this.moveWeight)+this.breakpoint.x,
                    (this.path2.y*this.moveWeight)+this.breakpoint.y,
                    (this.path2.z*this.moveWeight)+this.breakpoint.z
                );
                this.updateRollRotation(delta,this.path2.pathLength);
            }
            else {
                this.ballView.position = this.to.clone();
                this.updateRollRotation(1 - this.moveWeight,this.path2.pathLength);
                this.moveAnimationActive = false;
                if(kw.map.checkWinnerPosition()) {
                    kw.keyHandler.moveAnimationDone();
                }
            }
        }
    }
};

kw.BallAnimation.prototype.updateRotation = function(delta) {
    if(this.rotateAnimationActive) {
        var rotationDelta = this.fullRotAngle*delta*2;
        var q = new THREE.Quaternion();
        if(Math.abs(this.fullRotAngle) > Math.abs(this.actRotAngle+rotationDelta)) {
            q.setFromAxisAngle(this.rotationAxis,rotationDelta);
            this.ballView.quaternion.multiplyQuaternions(q,this.ballView.quaternion);
        }
        else {
            rotationDelta = this.fullRotAngle - this.actRotAngle;
            q.setFromAxisAngle(this.rotationAxis,rotationDelta);
            this.ballView.quaternion.multiplyQuaternions(q,this.ballView.quaternion);
            this.rotateAnimationActive = false;
            kw.keyHandler.rotateAnimationDone();
        }
        this.actRotAngle += rotationDelta;
    }
};

kw.BallAnimation.prototype.updateRollRotation = function(delta, length) {
    var q = new THREE.Quaternion();
    q.setFromAxisAngle(this.rollRotationAxis,-length*2*delta);
    this.ballView.quaternion.multiplyQuaternions(q,this.ballView.quaternion);
};