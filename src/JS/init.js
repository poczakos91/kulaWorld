/**
 * Created by poczakos on 11/9/2014.
 */
kw = {};
kw.init = function() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    kw.scene = new THREE.Scene();

    var numAsString = "0xffffff";
    var numAsNumber = parseInt(numAsString,16);
    console.log(numAsNumber);

    // create a render and set the size
    kw.renderer = new THREE.WebGLRenderer();
    //set the clear color to black
    kw.renderer.setClearColor("#000000");
    //set the canvas size
    kw.renderer.setSize(window.innerWidth, window.innerHeight);
    kw.renderer.shadowMapEnabled = true;




    //***********************************CREATING LIGHTSOURCES*******************************//NEEDS REFACTORING
    //POINTLIGHT
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.x = 5;
    pointLight.position.y = -5;
    pointLight.position.z = 0;
    pointLight.intensity = 1.5;
    pointLight.distance = 100;
    kw.scene.add(pointLight);
    //DIRECTIONALlIGHT
    var directionalLight = new THREE.DirectionalLight("#ffffff");
    directionalLight.position.set(-40, 60, -10);
    kw.scene.add(directionalLight);
    //AMBIENTlIGHT
    kw.ambientLight = new THREE.AmbientLight("#0a0a0a");
    kw.scene.add(kw.ambientLight);



    kw.initBackground(kw.scene);

    // add the output of the renderer to the html element
    $("#WebGL-output").append(kw.renderer.domElement);

    //variable to store the ID of the actual animation loop
    kw.animationFrameID = 0;

    //create a THREE.Clock instance to the renderLoop
    kw.clock = new THREE.Clock();

    //*********************************CREATING A MAP OBJECT***************************************//
    kw.map = new kw.Map();

    //*****************************************LOADING A MAP*************************************//mapLoader.js
    kw.cameraHandler = new kw.CameraHandler();

    kw.levelCounter = 1;
    kw.MapLoader.loadMap("test0"+kw.levelCounter+".json",kw.play);

};

kw.play = function() {
    kw.cameraHandler.addBallView(kw.map.ball.ballView);
    //kw.cameraHandler = new kw.CameraHandler(kw.map.ball.ballView,kw.map.direction,kw.map.ball.actFace);
    kw.keyHandler = new kw.KeyEventHandler(kw.map.ball);
    //kw.ballAnimationHandler = new kw.AnimationHandler(kw.map.ball.ballView,kw.map.direction);//kw.createAnimationHandler(kw.map.ball.ballView,kw.map.direction);
    kw.renderLoop();
};

kw.restart = function(e) {
    if(e.which == 13) {
        $("body").off();
        kw.endRenderLoop();

        kw.scene.remove(kw.map.ball.ballView);
        kw.scene.remove(kw.plane);
        kw.scene.remove(kw.youWin);
        kw.scene.remove(kw.map.view);

        kw.levelCounter++;

        kw.animationFrameID = 0;

        kw.clock = new THREE.Clock();

        kw.map = new kw.Map();

        kw.cameraHandler = new kw.CameraHandler();
        kw.MapLoader.loadMap("test0" + kw.levelCounter + ".json", kw.play);
    }
};