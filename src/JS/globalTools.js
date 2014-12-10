kw.tools = {};

TOP = "top";
BOTTOM = "bottom";
LEFT = "left";
RIGHT = "right";
FRONT = "front";
REAR = "rear";

UP = "up";
DOWN = "down";
FORWARD = "forward";
BACKWARD = "backward";

kw.tools.faceMap = {};
kw.tools.faceMap["top"] = new THREE.Vector3(0,1,0);
kw.tools.faceMap["bottom"] = new THREE.Vector3(0,-1,0);
kw.tools.faceMap["left"] = new THREE.Vector3(-1,0,0);
kw.tools.faceMap["right"] = new THREE.Vector3(1,0,0);
kw.tools.faceMap["front"] = new THREE.Vector3(0,0,1);
kw.tools.faceMap["rear"] = new THREE.Vector3(0,0,-1);

kw.tools.directionMap = {};
kw.tools.directionMap["up"] = new THREE.Vector3(0,1,0);
kw.tools.directionMap["down"] = new THREE.Vector3(0,-1,0);
kw.tools.directionMap["left"] = new THREE.Vector3(-1,0,0);
kw.tools.directionMap["right"] = new THREE.Vector3(1,0,0);
kw.tools.directionMap["forward"] = new THREE.Vector3(0,0,1);
kw.tools.directionMap["backward"] = new THREE.Vector3(0,0,-1);

/**
 * Creates the face string form of a vector
 * @param vector {THREE.Vector3}
 */
kw.tools.getFaceFromVector = function(vector) {
    if(vector.x == 1) return RIGHT;
    if(vector.x == -1) return LEFT;
    if(vector.y == 1) return TOP;
    if(vector.y == -1) return BOTTOM;
    if(vector.z == 1) return FRONT;
    if(vector.z == -1) return REAR;

    throw "The given vector was invalid: ("+vector.x+" , "+vector.y+" , "+vector.z+")";
};

/**
 * Creates the direction string form of a vector
 * @param vector {THREE.Vector3}
 */
kw.tools.getDirectionFromVector = function (vector) {
    if(vector.x == 1) return RIGHT;
    if(vector.x == -1) return LEFT;
    if(vector.y == 1) return UP;
    if(vector.y == -1) return DOWN;
    if(vector.z == 1) return FORWARD;
    if(vector.z == -1) return BACKWARD;

    throw "The given vector was invalid: ("+vector.x+" , "+vector.y+" , "+vector.z+")";
};


//the left and the right is switched
kw.tools.invertedFaceMap = {};
kw.tools.invertedFaceMap["top"] = new THREE.Vector3(0,1,0);
kw.tools.invertedFaceMap["bottom"] = new THREE.Vector3(0,-1,0);
kw.tools.invertedFaceMap["left"] = new THREE.Vector3(1,0,0);
kw.tools.invertedFaceMap["right"] = new THREE.Vector3(-1,0,0);
kw.tools.invertedFaceMap["front"] = new THREE.Vector3(0,0,1);
kw.tools.invertedFaceMap["rear"] = new THREE.Vector3(0,0,-1);