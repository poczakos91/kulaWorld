/**
 *
 * @constructor
 */
kw.Map = function() {
    this.cubeModells = [];
    this.view = new kw.MapView();
};

kw.Map.prototype.generateModel = function(rawMap) {
    for(var i=0;i<rawMap.elements.length;i++) {
        for(var j=0;j<rawMap.elements[i].length;j++) {
            for(var k=0;k<rawMap.elements[i][j].length;k++) {
                var cube = rawMap.elements[i][j][k];
                if(cube.id != undefined) {
                    this.cubeModells.push(
                        new kw.Cube(cube.id,cube.type,rawMap.cubeSize,cube.color,cube.position,cube.neighbours,this)
                    )
                }
            }
        }
    }
    this.view.appendChildrenFromModels(this.cubeModells);
    this.view.setOffset(new THREE.Vector3(0,0,0));

    this.direction = new kw.MainDirection(rawMap.startingDirection,rawMap.startingFace);
    this.ball = new kw.Ball(rawMap.startingCube,rawMap.startingFace,this.direction,this,"#002366");
};

kw.Map.prototype.getView = function() {
    return this.view;
};

kw.Map.prototype.getCubeById = function(id) {
    for(var i=this.cubeModells.length-1;i>=0;i--) {
        if(this.cubeModells[i].id == id) {
            return this.cubeModells[i];
        }
    }
    throw "There is no cube with the given id: "+id;
};