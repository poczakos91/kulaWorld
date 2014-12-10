
kw.Ball = function(startingCube,startingFace,direction,map,color,opt_texture) {
    this.actCube = map.getCubeById(startingCube);
    this.actFace = startingFace;
    this.direction = direction;
    this.map = map;
    this.ballView = new kw.BallView(0.3,color,opt_texture);
    this.ballView.setPosition(this.actCube,this.actFace);
    kw.scene.add(this.ballView);
    $("body").on("keydown", $.proxy(this.listenBallhandlerKeys,this));
};

kw.Ball.prototype.listenBallhandlerKeys = function(e) {
    if(!kw.animationHandler.isAnimationActive()) {
        switch (e.which) {
            case 38:    //up
                var directionAsString = this.direction.getActualDirection();
                var newCube = this.actCube.moveRequest(this.actFace, directionAsString, []);
                if (newCube !== null) {
                    var oldFace = this.actFace;
                    this.actFace = newCube.toFace;
                    var oldCube = this.actCube;
                    this.actCube = this.map.getCubeById(newCube.cubeID);

                    this.ballView.setPositionWithAnimation(this.actCube, this.actFace);
                    this.direction.faceChanged(oldFace, this.actFace);
                }
                else {
                    console.log("theres no possible places to move");
                }
                break;
            case 32:    //space (jump)

                break;
        }
    }
};