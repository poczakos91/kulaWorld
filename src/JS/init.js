/**
 * Created by poczakos on 11/9/2014.
 */
kw = {};
kw.init = function() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    kw.scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    kw.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 2000);

    // create a render and set the size
    kw.renderer = new THREE.WebGLRenderer();

    //set the clear color to black
    kw.renderer.setClearColor("#000000");

    //set the canvas size
    kw.renderer.setSize(window.innerWidth, window.innerHeight);

    // position and point the camera to the center of the scene
    kw.camera.position.x = 0;
    kw.camera.position.y = 0;
    kw.camera.position.z = -10;

    kw.camera.lookAt(new THREE.Vector3(0,-10,0));
    kw.renderer.shadowMapEnabled = true;

    $('body').on('keydown',kw.listenKeys);

    //*************************************USING ORBIT CONTROL**************************************//
    kw.orbitControls = new THREE.OrbitControls(kw.camera);
    //kw.orbitControls.autoRotate = true;








    //***********************************SOME SHIT WITH MARS*****************************//DELETABLE
    function createMesh(geom) {
        var planetTexture = THREE.ImageUtils.loadTexture("res/img/Mars_2k-050104.png");
        var normalTexture = THREE.ImageUtils.loadTexture("res/img/Mars-normalmap_2k.png");

        var planetMaterial = new THREE.MeshPhongMaterial({map: planetTexture, bumpMap: normalTexture});

        var wireFrameMat = new THREE.MeshBasicMaterial();
        wireFrameMat.wireframe = true;

        // create a multimaterial
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [planetMaterial]);
        return mesh;
    }
    var sphere = createMesh(new THREE.SphereGeometry(30, 20, 20));
    sphere.position.x = 120;
    sphere.position.y = 0;
    sphere.position.z = 200;
    kw.scene.add(sphere);

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


    //************************************AND SOME OTHER FUCKING STUFFS***************************************//
    /*var controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;

        this.opacity = someCube.cubeMaterial.opacity;
        this.transparent = someCube.cubeMaterial.transparent;
        this.overdraw = someCube.cubeMaterial.overdraw;
        this.visible = someCube.cubeMaterial.visible;
        this.emissive = someCube.cubeMaterial.emissive.getHex();
        this.ambient = someCube.cubeMaterial.ambient.getHex();
        this.specular = someCube.cubeMaterial.specular.getHex();
        this.shininess = someCube.cubeMaterial.shininess;
        this.side = "front";

        this.color = someCube.cubeMaterial.color.getStyle();


        this.selectedMesh = "cube";

    };

    var gui = new dat.GUI();


    var spGui = gui.addFolder("Mesh");
    spGui.add(controls, 'opacity', 0, 1).onChange(function (e) {
        someCube.cubeMaterial.opacity = e
    });
    spGui.add(controls, 'transparent').onChange(function (e) {
        someCube.cubeMaterial.transparent = e
    });
    spGui.add(controls, 'visible').onChange(function (e) {
        someCube.cubeMaterial.visible = e
    });
    spGui.addColor(controls, 'ambient').onChange(function (e) {
        someCube.cubeMaterial.ambient = new THREE.Color(e)
    });
    spGui.addColor(controls, 'emissive').onChange(function (e) {
        someCube.cubeMaterial.emissive = new THREE.Color(e)
    });
    spGui.addColor(controls, 'specular').onChange(function (e) {
        someCube.cubeMaterial.specular = new THREE.Color(e)
    });
    spGui.add(controls, 'shininess', 0, 200).onChange(function (e) {
        someCube.cubeMaterial.shininess = e
    });
    spGui.add(controls, 'side', ["front", "back", "double" ]).onChange(function (e) {
        console.log(e);
        switch (e) {
            case "front":
                someCube.cubeMaterial.side = THREE.FrontSide;
                break;
            case "back":
                someCube.cubeMaterial.side = THREE.BackSide;
                break;
            case "double":
                someCube.cubeMaterial.side = THREE.DoubleSide
                break;
        }
        someCube.cubeMaterial.needsUpdate = true;
        console.log(someCube.cubeMaterial);
    });
    spGui.addColor(controls, 'color').onChange(function (e) {
        someCube.cubeMaterial.color.setStyle(e)
    });*/





































    // add the output of the renderer to the html element
    $("#WebGL-output").append(kw.renderer.domElement);

    //variable to store the ID of the actual animation loop
    kw.animationFrameID = 0;

    //create a THREE.Clock instance to the renderLoop
    kw.clock = new THREE.Clock();

    //*********************************CREATING BACKGROUND STARS********************************//deepSpace.js
    kw.scene.add(kw.createStars());
    kw.scene.add(kw.createStars());
    kw.scene.add(kw.createStars());

    //*********************************CREATING A MAP OBJECT***************************************//
    kw.map = new kw.Map();
    //*****************************************LOADING A MAP*************************************//mapLoader.js
    kw.MapLoader.loadMap("test02.json",kw.play);


    kw.camera.rotateX(-Math.PI);
};

kw.play = function() {
    kw.renderLoop();
};