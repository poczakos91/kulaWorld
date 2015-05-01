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
 * Creates the direction string form a vector
 * @param vector {THREE.Vector3}
 */
kw.tools.getDirectionFromVector = function (vector) {
    kw.tools.vectorCorrector(vector);
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


kw.tools.invertFace = function(face) {
    if(face == LEFT) return RIGHT;
    if(face == RIGHT) return LEFT;
    return face;
};

kw.tools.vectorCorrector = function(vector) {
    if(Math.abs(vector.x)>0.05) vector.x = vector.x / Math.abs(vector.x);
    else vector.x = 0;

    if(Math.abs(vector.y)>0.05) vector.y = vector.y / Math.abs(vector.y);
    else vector.y = 0;

    if(Math.abs(vector.z)>0.05) vector.z = vector.z / Math.abs(vector.z);
    else vector.z = 0;
};

kw.tools.changeXComponentInVector = function(vector) {
    var vec = vector.clone();
    vec.x = vec.x * (-1);
    return vec;
};

//the refreshing rate of the game
kw.dt = 0.05;

//the speed of the ball and camera
kw.speed = 4;