/**
 * Defines the model of a cube
 * @param id - The id of the cube
 * @param type - //TODO I don't know what to do with that, maybe you can use it in the future
 * @param size - The size of the cube's sides
 * @param color - The color of the cube
 * @param position - The position of the cube in 3D space, it's for the cube_view object
 * @param neighbours - [{
 *                          fromFace : "top"|"bottom"|"left"|"right"|"front"|"rear",
 *                          toCube : ID(Number),
 *                          toFace : "top"|"bottom"|"left"|"right"|"front"|"rear",
 *                          requiredDirection : "up"|"down"|"left"|"right"|"forward"|"backward"
 *                          requiredKeys : [keyCode1,keyCode2,...]
 *                     },
 *                     {
 *                          ...
 *                     }
 *                    ]
 * @constructor
 */
kw.Cube = function(id,type,size,color,position,neighbours,map) {
    this.id = id;
    this.type = type;
    this.position = new THREE.Vector3(position.x,position.y,position.z);
    this.neighbours = neighbours;
    this.map = map;

    //this.faces = {};
    //this.faces.top = {position: }

    var viewPosition = new THREE.Vector3(this.position.x*size,this.position.y*size,this.position.z*size);
    this.view = new kw.CubeView(viewPosition,size,color);

};

kw.Cube.prototype.getView = function() {
    return this.view;
};

kw.Cube.prototype.getId = function() {
    return this.id;
};

kw.Cube.prototype.moveRequest = function(fromFace,direction,extraKeys) {
    for(var i= 0,size= this.neighbours.length;i<size;i++) {
        //TODO the extrakey conditions at the end is wrong, the length doesn't matter, just the content
        if(this.neighbours[i].fromFace === fromFace && this.neighbours[i].requiredDirection === direction && this.neighbours[i].requiredKeys.length == extraKeys.length) {
            return {cubeID: this.neighbours[i].toCube, toFace: this.neighbours[i].toFace};
        }
    }
    return null;
};