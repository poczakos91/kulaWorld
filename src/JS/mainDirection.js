
kw.MainDirection = function(startingDirection,startingFace) {

    this.direction = kw.tools.directionMap[startingDirection].clone();
    this.faceDirection = kw.tools.faceMap[startingFace];
    this.rollRotationAxis = new THREE.Vector3();
    this.calculateRollRotationAxis();

    this.directionVectorRotationAxis = new THREE.Vector3();
};

kw.MainDirection.prototype.faceChanged = function(fromFace,toFace) {
    if(fromFace !== toFace) {
        fromFace = kw.tools.faceMap[fromFace];
        toFace = kw.tools.faceMap[toFace];
        this.directionVectorRotationAxis.crossVectors(fromFace, toFace);
        this.direction.applyAxisAngle(this.directionVectorRotationAxis, Math.PI / 2);
        this.weight = 0;
        this.faceDirection = toFace;
    }
};

kw.MainDirection.prototype.rotateDirection = function(angle) {
    this.direction.applyAxisAngle(this.faceDirection, -angle);
};

kw.MainDirection.prototype.getActualDirection = function() {
    return kw.tools.getDirectionFromVector(this.direction);
};

kw.MainDirection.prototype.getBallRotationAxis = function() {
    return kw.tools.invertedFaceMap[kw.tools.getFaceFromVector(this.faceDirection)].clone();
};

kw.MainDirection.prototype.getBallRollRotationAxis = function() {
    return this.rollRotationAxis;
};

kw.MainDirection.prototype.calculateRollRotationAxis = function() {
    this.rollRotationAxis = this.faceDirection.clone().cross(this.direction);
    kw.tools.vectorCorrector(this.rollRotationAxis);
    this.rollRotationAxis.x *= -1;
};

kw.MainDirection.prototype.getRollRotAxis = function() {
    kw.tools.vectorCorrector(this.rollRotationAxis);
    return this.rollRotationAxis;
};