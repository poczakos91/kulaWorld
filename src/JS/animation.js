
kw.createAnimationHandler = function(ball0,direction0) {
    var ballView = ball0;
    var direction = direction0;
    var from,to;
    var moveAnimationActive = false;
    var rotateAnimationActive = false;
    var fullDistance = new THREE.Vector3(0,0,0);
    var distance1 = new THREE.Vector3(0,0,0);
    var distance2 = new THREE.Vector3(0,0,0);
    var actualRotation = 0;
    var rotationAngle = 0;
    var breakPoint = new THREE.Vector3(0,0,0);
    var enabledMovingToBreakpoint = false;
    var weight = 0;

    var that = {};
    that.startMoveAnimation = startMoveAnimation;
    that.startRotateAnimation = startRotateAnimation;
    that.update = update;
    that.isAnimationActive = isAnimationActive;
    return that;

    function startMoveAnimation(from0, to0) {
        from = from0.clone();
        to = to0.clone();
        fullDistance.subVectors(to,from);
        var dirTemp = kw.tools.directionMap[direction.getActualDirection()].clone();
        for(var i=0;i<3;i++) {
            if(dirTemp.getComponent(i) == 1 || dirTemp.getComponent(i) == -1) {
                breakPoint.setComponent(i,to.getComponent(i));
            }
            else {
                breakPoint.setComponent(i,from.getComponent(i));
            }
        }
        distance1.subVectors(breakPoint,from);
        distance2.subVectors(to,breakPoint);

        actualRotation = 0;
        weight = 0;
        enabledMovingToBreakpoint = true;
        moveAnimationActive = true;
    }

    function startRotateAnimation(angle) {
        actualRotation = 0;
        rotationAngle = angle;
        rotateAnimationActive = true;
    }

    function update(delta) {
        if(moveAnimationActive) {
            updateMoveAnimation(delta);
        }
        if(rotateAnimationActive) {
            updateRotateAnimation(delta);
        }
    }

    function updateMoveAnimation(delta) {
        delta *=2;
        if(distance1.length()<0.5 ) delta*=3;
        if(enabledMovingToBreakpoint) {
            if (weight + delta < 1) {
                weight += delta;
                ballView.position.setX((distance1.x * weight) + from.x);
                ballView.position.setY((distance1.y * weight) + from.y);
                ballView.position.setZ((distance1.z * weight) + from.z);
                updateRollRotateAnimation(delta,distance1.length());
            }
            else {
                ballView.position = breakPoint.clone();
                enabledMovingToBreakpoint = false;
                updateRollRotateAnimation(delta,distance1.length());
                delta = weight + delta - 1;
                weight = 0;
            }
        }
        else {
            if(weight+delta < 1 && distance2.length()>0.03) {
                weight += delta;
                ballView.position.setX((distance2.x*weight)+breakPoint.x);
                ballView.position.setY((distance2.y*weight)+breakPoint.y);
                ballView.position.setZ((distance2.z*weight)+breakPoint.z);
                updateRollRotateAnimation(delta,distance2.length());
            }
            else {
                ballView.position = to;
                updateRollRotateAnimation(delta,distance2.length());
                moveAnimationActive = false;
            }
        }


    }

    function updateRotateAnimation(delta) {
        var rotationDelta = rotationAngle*delta*2;
        var q = new THREE.Quaternion();
        if(Math.abs(rotationAngle) > Math.abs(actualRotation+rotationDelta)) {
            q.setFromAxisAngle(direction.getBallRotationAxis(),rotationDelta);
            ballView.quaternion.multiplyQuaternions(q,ballView.quaternion);
        }
        else {
            rotationDelta = rotationAngle - actualRotation;
            q.setFromAxisAngle(direction.getBallRotationAxis(),rotationDelta);
            ballView.quaternion.multiplyQuaternions(q,ballView.quaternion);
            rotateAnimationActive = false;
        }
        actualRotation += rotationDelta;
    }

    function updateRollRotateAnimation(delta,length) {
        var q = new THREE.Quaternion();
        q.setFromAxisAngle(direction.getBallRollRotationAxis(),-length*2*delta);
        ballView.quaternion.multiplyQuaternions(q,ballView.quaternion);
    }

    function isAnimationActive() {
        return moveAnimationActive || rotateAnimationActive;
    }
};
