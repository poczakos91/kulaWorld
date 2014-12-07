
kw.MainDirection = function(startingDirection,startingFace) {
    switch (startingDirection) {
        case "up": this.direction = new THREE.Vector3(0,1,0); break;
        case "down": this.direction = new THREE.Vector3(0,-1,0); break;
        case "left": this.direction = new THREE.Vector3(-1,0,0); break;
        case "right": this.direction = new THREE.Vector3(1,0,0); break;
        case "forward": this.direction = new THREE.Vector3(0,0,1); break;
        case "backward": this.direction = new THREE.Vector3(0,0,-1);
    }

    this.directionMap = {};
    this.directionMap["top"] = new THREE.Vector3(0,1,0);
    this.directionMap["bottom"] = new THREE.Vector3(0,-1,0);
    this.directionMap["left"] = new THREE.Vector3(-1,0,0);
    this.directionMap["right"] = new THREE.Vector3(1,0,0);
    this.directionMap["front"] = new THREE.Vector3(0,0,1);
    this.directionMap["rear"] = new THREE.Vector3(0,0,-1);

    this.faceDirection = this.directionMap[startingFace];

    $("body").on("keydown", $.proxy(this.listenRotateKeys,this));
};

kw.MainDirection.prototype.faceChanged = function(fromFace,toFace) {
    fromFace = this.directionMap[fromFace];
    toFace = this.directionMap[toFace];
    var newAxis = new THREE.Vector3(0,0,0);
    newAxis.crossVectors(fromFace,toFace);

    this.direction.applyAxisAngle(newAxis,Math.PI/2);
    this.faceDirection = toFace;
};

kw.MainDirection.prototype.listenRotateKeys = function(e) {
    switch (e.which) {
        case 37:    //left
            this.direction.applyAxisAngle(this.faceDirection,-Math.PI/2);
            break;
        case 39:    //right
            this.direction.applyAxisAngle(this.faceDirection,Math.PI/2);
    }
};

kw.MainDirection.prototype.getActualDirection = function() {
    if(this.direction.x == 1) {
        return "right";
    }
    if(this.direction.x == -1) {
        return "left";
    }
    if(this.direction.y == 1) {
        return "up";
    }
    if(this.direction.y == -1) {
        return "down";
    }
    if(this.direction.z == 1) {
        return "forward";
    }
    if(this.direction.z == -1) {
        return "backward";
    }
};