kw.cameraFactory = function() {
    var that = {};
    var camera,trackballControl;

    //init camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = -10;
    camera.lookAt(new THREE.Vector3(0,1,0));

    //init trackball control
    trackballControl = new THREE.TrackballControls(camera);
    trackballControl.noZoom = false;
    trackballControl.noPan = true;
    trackballControl.rotateSpeed = 3.0;
    trackballControl.zoomSpeed = 10.0;
    trackballControl.staticMoving = true;
    trackballControl.maxDistance = 50;
    trackballControl.minDistance = 5;

    //init firstperson control
    //TODO init firstperson control


    that.camera = camera;
    that.trackballControl = trackballControl;
    that.switchControl = switchControl;

    return that;

    function switchControl() {
        //TODO switching between trackballcontrol and firstpersoncontrol
    }

};
