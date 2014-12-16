
kw.MainDirection = function(startingDirection,startingFace) {

    this.direction = kw.tools.directionMap[startingDirection];
    this.faceDirection = kw.tools.faceMap[startingFace];
    this.rollRotationAxis = this.calculateRollRotationAxis();

    $("body").on("keydown", $.proxy(this.listenRotateKeys,this));
};

kw.MainDirection.prototype.faceChanged = function(fromFace,toFace) {
    fromFace = kw.tools.faceMap[fromFace];
    toFace = kw.tools.faceMap[toFace];
    var newAxis = new THREE.Vector3(0,0,0);
    newAxis.crossVectors(fromFace,toFace);
    if(newAxis.x != 0 || newAxis.y !== 0 || newAxis.z !== 0) {
        this.direction.applyAxisAngle(newAxis, Math.PI / 2);
        this.faceDirection = toFace;
        console.log("face changed");
        console.log("face: "+this.faceDirection.x+" "+this.faceDirection.y+" "+this.faceDirection.z);
        console.log("direction: "+this.direction.x+" "+this.direction.y+" "+this.direction.z);
        console.log("rotAxis: "+this.rollRotationAxis.x+" "+this.rollRotationAxis.y+" "+this.rollRotationAxis.z);
        console.log("--------------------------------------------------------------------------------------");
    }
};

kw.MainDirection.prototype.listenRotateKeys = function(e) {
    if(!kw.animationHandler.isAnimationActive()) {
        switch (e.which) {
            case 37:    //left
                this.direction.applyAxisAngle(this.faceDirection, -Math.PI / 2);
                kw.animationHandler.startRotateAnimation(Math.PI / 2, kw.tools.invertedFaceMap[kw.tools.getFaceFromVector(this.faceDirection)]);
                this.rollRotationAxis = this.calculateRollRotationAxis();
                break;
            case 39:    //right
                this.direction.applyAxisAngle(this.faceDirection, Math.PI / 2);
                kw.animationHandler.startRotateAnimation(-Math.PI / 2, kw.tools.invertedFaceMap[kw.tools.getFaceFromVector(this.faceDirection)]);
                this.rollRotationAxis = this.calculateRollRotationAxis();
        }
    }
};

kw.MainDirection.prototype.getActualDirection = function() {
    return kw.tools.getDirectionFromVector(this.direction);
};

kw.MainDirection.prototype.getBallRotationAxis = function() {
    return kw.tools.invertedFaceMap[kw.tools.getFaceFromVector(this.faceDirection)].clone();
};

kw.MainDirection.prototype.getBallRollRotationAxis = function() {
    //this 3 if statements are required because the vector have to be normalized
    return this.rollRotationAxis;
};

kw.MainDirection.prototype.calculateRollRotationAxis = function() {
    var something = this.faceDirection.clone().cross(this.direction);
    if (Math.abs(something.x) != 1) something.x = 0;
    if (Math.abs(something.y) != 1) something.y = 0;
    if (Math.abs(something.z) != 1) something.z = 0;
    console.log("face: "+this.faceDirection.x+" "+this.faceDirection.y+" "+this.faceDirection.z);
    console.log("direction: "+this.direction.x+" "+this.direction.y+" "+this.direction.z);
    console.log("rotAxis: "+something.x+" "+something.y+" "+something.z);
    console.log("--------------------------------------------------------------------------------------");
    something.x *= -1;
    return something;

};