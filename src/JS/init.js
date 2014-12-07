/**
 * Created by poczakos on 11/9/2014.
 */
kw = {};
kw.init = function() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    kw.scene = new THREE.Scene();



    // create a render and set the size
    kw.renderer = new THREE.WebGLRenderer();
    //set the clear color to black
    kw.renderer.setClearColor("#000000");
    //set the canvas size
    kw.renderer.setSize(window.innerWidth, window.innerHeight);
    kw.renderer.shadowMapEnabled = true;


    kw.cameraHandler = kw.cameraFactory();



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








    var geom = new THREE.SphereGeometry(0.3,30,30);
    var material = new THREE.MeshPhongMaterial({"color": "#22aa44"});
    var sphere = new THREE.Mesh(geom,material);
    sphere.position.z = -0.8;
    kw.scene.add(sphere);


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
    kw.MapLoader.loadMap("test02.json",kw.play);


};

kw.play = function() {
    kw.renderLoop();
};