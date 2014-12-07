
kw.Ball = function(startingCube,startingFace,direction,map,color,opt_texture) {
    this.actCube = map.getCubeById(startingCube);
    this.actFace = startingFace;
    this.direction = direction;
    this.map = map;
    this.ballView = new kw.BallView(this.getActualPosition(),0.3,color,opt_texture);
    kw.scene.add(this.ballView);
};

kw.Ball.prototype.getActualPosition = function() {
    //TODO 1. - emelj ki egy külön fájlba mindenféle map-et, amikkal a (string) iránynevekből vektorokat és a (string) facenevekből is vektorokat kapsz
    //TODO 2. - írd meg ezt a függvényt: this.actCube.view.position eltologatva a this.actFace-nek megfelelően
    //TODO 3. - fejezd be a lapon lévő szekvencia diagramot, hogy menjen a labda tologatása
    éalksdféasldkfjé
};