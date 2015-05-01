/**
 * The view to the kw.Map
 * @param cubes
 * @constructor
 * @extends THREE.Object3D
 */
kw.MapView = function() {
    THREE.Object3D.call(this);

};
kw.MapView.prototype = Object.create(THREE.Object3D.prototype);

kw.MapView.prototype.appendChildrenFromModels = function(cubeModels) {
    for(var i=0;i<cubeModels.length;i++) {
        this.add(cubeModels[i].getView());
    }
};

kw.MapView.prototype.setOffset = function(offset) {
    this.position.set(offset.x,offset.y,offset.z);
};