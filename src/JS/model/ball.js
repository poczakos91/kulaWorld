/*
kw.Ball = function(startingCube,startingFace,direction,map,color,opt_texture) {
    this.actCube = map.getCubeById(startingCube);
    this.actFace = startingFace;
    this.direction = direction;
    this.map = map;
    this.ballView = new kw.BallView(0.3,color,opt_texture);
    this.ballView.setPosition(this.actCube,this.actFace);
    kw.scene.add(this.ballView);
};

kw.Ball.prototype.move = function() {
    if(!kw.ballAnimationHandler.isAnimationActive()) {
        var directionAsString = this.direction.getActualDirection();
        var newCube = this.actCube.moveRequest(this.actFace, directionAsString, []);
        if (newCube !== null) {
            var oldFace = this.actFace;
            this.actFace = newCube.toFace;
            var oldCube = this.actCube;
            this.actCube = this.map.getCubeById(newCube.cubeID);

            this.ballView.setPositionWithAnimation(this.actCube, this.actFace);
            kw.cameraHandler.positionChanged(this.actCube,this.actFace);
            this.direction.faceChanged(oldFace, this.actFace);
        }
        else {
            console.log("theres no possible places to move");
        }
    }
};

kw.Ball.prototype.rotate = function(angle) {
    if(! kw.ballAnimationHandler.isAnimationActive()) {
        kw.ballAnimationHandler.startRotateAnimation(angle, kw.tools.invertFace(this.actFace));
    }
};*/

kw.Ball = function(startingCube,startingFace,direction,map,camera,color,opt_texture) {
    this.actCube = map.getCubeById(startingCube);
    this.actFace = startingFace;
    this.direction = direction;
    this.map = map;
    this.camera = camera;
    this.ballView = new kw.BallView(0.3,color,opt_texture);
    this.ballView.setPosition(this.actCube,this.actFace);
    kw.scene.add(this.ballView);
};

kw.Ball.prototype.move = function() {
        if(!this.ballView.ballAnimation.moveAnimationActive && !this.ballView.ballAnimation.rotateAnimationActive) {
            var oldDirection = this.direction.getActualDirection();
            var newCube = this.actCube.moveRequest(this.actFace, oldDirection, []);
            if (newCube !== null) {
                var oldFace = this.actFace;
                this.actFace = newCube.toFace;
                var oldCube = this.actCube;
                this.actCube = this.map.getCubeById(newCube.cubeID);
                this.direction.faceChanged(oldFace, this.actFace);

                var settings = this.createSettings(oldDirection, oldFace, oldCube);

                this.ballView.startMove(settings);
                this.camera.startMove(settings);
            }
            else {
                console.log("theres no possible places to move");
            }
        }
};

kw.Ball.prototype.rotate = function(angle) {
    var oldDirection = this.direction.getActualDirection();
    var oldRollRotAxis = this.direction.getRollRotAxis();
    this.direction.rotateDirection(angle);
    this.direction.calculateRollRotationAxis();
    var settings = this.createSettings(oldDirection,null,null,oldRollRotAxis);

    this.ballView.startRotate(settings,angle);
    this.camera.startRotate(settings,angle );
};

kw.Ball.prototype.switchCamera = function() {
    if (!this.camera.trackballControl.enabled) {
        this.camera.trackballControl.enabled = true;
        this.camera.changeToTrackBallControl();
    } else {
        this.camera.trackballControl.enabled = false;
        var settings = this.createSettings(null, null, null, null);
        this.camera.changeToFirstPersonControl(settings);
    }
};

kw.Ball.prototype.update = function(delta) {
    this.ballView.update(delta);
    this.camera.update(delta);
};

/**
 *
 * @param oldDirection {String} - optional
 * @param oldFace {String} - optional
 * @param oldCube {kw.Cube} - optional
 * @returns {{}}
 */
kw.Ball.prototype.createSettings = function(oldDirection, oldFace, oldCube, oldBallRotAxis) {
    var settings = {};
    if(oldDirection) {
        settings.ballDirFrom = kw.tools.directionMap[oldDirection].clone();
        settings.ballDirFromString = oldDirection;

        settings.ballDirToString = this.direction.getActualDirection();
        settings.ballDirTo = kw.tools.directionMap[settings.ballDirToString].clone();
    }
    else {
        settings.ballDirString = this.direction.getActualDirection();
        settings.ballDir = kw.tools.directionMap[settings.ballDirString].clone();
    }

    if(oldFace) {
        settings.faceFrom = kw.tools.faceMap[oldFace].clone();
        settings.faceFromString = oldFace;

        settings.faceTo = kw.tools.faceMap[this.actFace].clone();
        settings.faceToString = this.actFace;
    }
    else {
        settings.face = kw.tools.faceMap[this.actFace].clone();
        settings.faceString = this.actFace;
    }

    if(oldCube) {
        settings.ballPosFrom = oldCube.position.clone().add(kw.tools.invertedFaceMap[oldFace].clone().multiplyScalar(oldCube.view.originalSize / 2 + this.ballView.originalRadius));
        settings.ballPosTo = this.actCube.position.clone().add(kw.tools.invertedFaceMap[this.actFace].clone().multiplyScalar(this.actCube.view.originalSize / 2 + this.ballView.originalRadius));
    }
    else {
        settings.ballPos = this.actCube.position.clone().add(kw.tools.invertedFaceMap[this.actFace].clone().multiplyScalar(this.actCube.view.originalSize / 2 + this.ballView.originalRadius));
    }

    if(oldBallRotAxis) {
        settings.rollRotAxisFrom = oldBallRotAxis;
        settings.rollRotAxisTo = this.direction.getRollRotAxis();
    }
    else {
        settings.rollRotAxis = this.direction.getRollRotAxis();
    }

    return settings;
};