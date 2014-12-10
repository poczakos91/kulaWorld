kw.cameraFactory = function(ballView0,direction0) {
    var that = {};
    var camera,trackballControl;

    //save the parameters to variables
    var ballView = ballView0;
    var direction = direction0;

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

    $("body").on("keydown", $.proxy(switchControl,this));

    that.camera = camera;
    that.trackballControl = trackballControl;
    that.switchControl = switchControl;
    that.updateCamera = updateCamera;

    return that;

    function switchControl(e) {
        switch(e.which) {
            case 83:        //letter 's'
                trackballControl.enabled = !trackballControl.enabled;
                break;
        }
    }

    function updateCamera(delta) {
        if(trackballControl.enabled) {
            trackballControl.update(delta);
        }
        else {
            updateFirstPerson(delta);
        }
    }

    function updateFirstPerson(delta) {
        camera.position = ballView.position.clone().add(kw.tools.invertedFaceMap[kw.tools.getFaceFromVector(direction.direction)].clone().multiplyScalar(-3).add(kw.tools.invertedFaceMap[kw.tools.getFaceFromVector(direction.faceDirection)].clone().multiplyScalar(3)));
        camera.lookAt(ballView.position)
    }

};
