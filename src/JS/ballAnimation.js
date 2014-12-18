
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
    this.velocity1 = new THREE.Vector3();
    this.velocity2 = new THREE.Vector3();
    this.rollRotationAxis = new THREE.Vector3();
    this.pathDone = 0;
    this.moveAnimationActive = false;

    //attributes for rotateAnimation
    this.fullRotAngle = 0;
    this.actRotAngle = 0;
    this.rotationAxis = new THREE.Vector3();
    this.rotateAnimationActive = false;
};
/*
kw.BallAnimation.prototype.updateMove = function(delta) {
    if(this.moveAnimationActive) {
        delta *= 8;
        if(this.path1.pathLength<0.5 ) delta*=1;
        if(!this.path2Active) {
//            console.log("path1        delta is: "+delta);
            if (this.moveWeight + delta < 1) {
                this.moveWeight += delta;
//                console.log("below 1");
                this.ballView.position.set(
                    (this.path1.x * this.moveWeight) + this.from.x,
                    (this.path1.y * this.moveWeight) + this.from.y,
                    (this.path1.z * this.moveWeight) + this.from.z
                );
                this.updateRollRotation(delta,this.path1.pathLength);
            }
            else {
//                console.log("NOT below 1");
                this.ballView.position = this.breakpoint.clone();
                this.path2Active = true;
                this.updateRollRotation(1 - this.moveWeight,this.path1.pathLength);
                this.moveWeight = 0;
            }
        }
        else {
            if(this.path2.pathLength>0.03) {
//                console.log("path2");
                if (this.moveWeight + delta < 1) {
//                    console.log("below 1");
                    this.moveWeight += delta;
                    this.ballView.position.set(
                        (this.path2.x * this.moveWeight) + this.breakpoint.x,
                        (this.path2.y * this.moveWeight) + this.breakpoint.y,
                        (this.path2.z * this.moveWeight) + this.breakpoint.z
                    );
                    this.updateRollRotation(delta, this.path2.pathLength);
                }
                else {
//                    console.log("NOT below 1");
                    this.ballView.position = this.to.clone();
                    this.updateRollRotation(1 - this.moveWeight, this.path2.pathLength);
                    this.moveAnimationActive = false;
                    if (kw.map.checkWinnerPosition()) {
                        kw.keyHandler.moveAnimationDone();
                    }
                }
            }
            else {
//                console.log("path2 was too short");
                this.moveAnimationActive = false;
                if (kw.map.checkWinnerPosition()) {
                    kw.keyHandler.moveAnimationDone();
                }
            }
        }
    }
};*/




kw.BallAnimation.prototype.updateMove = function(delta) {
    if(this.moveAnimationActive) {
        if(!this.path2Active) {
            if(this.pathDone + this.velocity1.velocityLength*delta < this.path1.pathLength) {
                this.pathDone += this.velocity1.velocityLength*delta;
                this.ballView.position.add(this.velocity1.clone().multiplyScalar(delta));
                this.updateRollRotation(this.velocity1.velocityLength*delta);
            }
            else {
                var newDelta = (this.pathDone-this.path1.pathLength)/this.velocity1.velocityLength+delta;
                this.ballView.position.add(this.velocity1.clone().multiplyScalar(delta-newDelta));
                this.updateRollRotation(this.velocity1.velocityLength*(delta-newDelta));
                this.pathDone = 0;
                this.path2Active = true;
                delta = newDelta;
            }
            /*if (this.moveWeight + delta < 1) {
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
            }*/
        }
        if(this.path2Active) {
            if(this.pathDone + this.velocity2.velocityLength*delta < this.path2.pathLength) {
                this.pathDone += this.velocity2.velocityLength*delta;
                this.ballView.position.add(this.velocity2.clone().multiplyScalar(delta));
                this.updateRollRotation(this.velocity2.velocityLength*delta);
            }
            else {
                var newDelta = (this.pathDone-this.path2.pathLength)/this.velocity2.velocityLength+delta;
                this.ballView.position.add(this.velocity2.clone().multiplyScalar(delta-newDelta));
                this.updateRollRotation(this.velocity2.velocityLength*(delta-newDelta));
                this.moveAnimationActive = false;
                if (kw.map.checkWinnerPosition()) {
                    kw.keyHandler.moveAnimationDone();
                }
            }
          /*  if (this.moveWeight + delta < 1) {
                this.moveWeight += delta;
                this.ballView.position.set(
                    (this.path2.x * this.moveWeight) + this.breakpoint.x,
                    (this.path2.y * this.moveWeight) + this.breakpoint.y,
                    (this.path2.z * this.moveWeight) + this.breakpoint.z
                );
                this.updateRollRotation(delta, this.path2.pathLength);
            }
            else {
                this.ballView.position = this.to.clone();
                this.updateRollRotation(1 - this.moveWeight, this.path2.pathLength);
                this.moveAnimationActive = false;
                if (kw.map.checkWinnerPosition()) {
                    kw.keyHandler.moveAnimationDone();
                }
            }*/
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

kw.BallAnimation.prototype.updateRollRotation = function(length) {
    var q = new THREE.Quaternion();
    q.setFromAxisAngle(this.rollRotationAxis,-length/(2*this.ballView.originalRadius));
    this.ballView.quaternion.multiplyQuaternions(q,this.ballView.quaternion);
};