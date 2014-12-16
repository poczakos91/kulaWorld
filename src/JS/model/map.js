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


    this.target = this.getCubeById(rawMap.target.id);
    this.target.winnerFace = rawMap.target.face;
    var planeGeometry = new THREE.PlaneGeometry(1,1);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0x00aa00});
    planeMaterial.side = THREE.DoubleSide;
    var plane = new THREE.Mesh(planeGeometry,planeMaterial);
    plane.position = this.target.position.clone().add(kw.tools.invertedFaceMap[rawMap.target.face].clone().multiplyScalar(this.target.view.originalSize / 2 + 0.001));
    if(rawMap.target.face === "top" || rawMap.target.face === "bottom") {
        plane.rotation.x = Math.PI/2;
    }
    if(rawMap.target.face === "left" || rawMap.target.face === "right") {
        plane.rotation.y = Math.PI/2;
    }
    kw.scene.add(plane);


    this.view.appendChildrenFromModels(this.cubeModells);
    this.view.setOffset(new THREE.Vector3(0,0,0));
    this.direction = new kw.MainDirection(rawMap.ball.startingDirection,rawMap.ball.startingFace);
    this.ball = new kw.Ball(rawMap.ball.startingCube,rawMap.ball.startingFace,this.direction,this,kw.cameraHandler,rawMap.ball.color,rawMap.ball.texture);
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

kw.Map.prototype.checkWinnerPosition = function () {
    if(this.ball.actCube.id == this.target.id && this.ball.actFace === this.target.winnerFace) {
        //TODO win
        var options = {
            size: 1,
            height: 0.2,
            weight: "normal",
            bevelEnabled: false,
            curveSegments: 12,
            steps: 1,
            font: "helvetiker"
        };
        var geom = new THREE.TextGeometry("You win", options);
        var mat = new THREE.MeshPhongMaterial({specular: 0xffffff, color: 0xff5555, shininess: 100, metal: true});
        var plane = THREE.SceneUtils.createMultiMaterialObject(geom, [mat]);
        plane.position.set(4,0.6,3);
        plane.rotation.y = Math.PI;
        kw.cameraHandler.changeToTrackBallControl(new THREE.Vector3(-2,3,-10));
        kw.scene.add(plane);
        $("body").off();
        return false;
    }
    else {
        return true;
    }
};