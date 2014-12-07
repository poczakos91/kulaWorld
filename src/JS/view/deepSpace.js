kw.initBackground = function(scene) {
    for(var i=0;i<3;i++) {
        scene.add(createStars());
    }

    var mars = createPlanet(new THREE.SphereGeometry(30, 20, 20),"res/img/Mars_2k-050104.png","res/img/Mars-normalmap_2k.png");
    mars.position.x = 120;
    mars.position.y = 0;
    mars.position.z = 200;
    scene.add(mars);


    function createPlanet(geom,texture,opt_normalMap) {
        var planetTexture = THREE.ImageUtils.loadTexture(texture);
        if(opt_normalMap) {
            var normalTexture = THREE.ImageUtils.loadTexture(opt_normalMap);
        }


        var planetMaterial = new THREE.MeshPhongMaterial({map: planetTexture, bumpMap: normalTexture});

        var wireFrameMat = new THREE.MeshBasicMaterial();
        wireFrameMat.wireframe = true;

        // create a multimaterial
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [planetMaterial]);
        return mesh;
    }

    function createStars() {
        /*    var geom = new THREE.Geometry();
         var material = new THREE.ParticleBasicMaterial({
         size: 4,
         transparent: true,
         opacity: Math.random(),
         sizeAttenuation: true
         });
         var phi = 0;
         var theta = 0;
         var smallRange = 300;
         var bigRange = 500;
         var interval = bigRange-smallRange;
         var r = 0;
         var color = new THREE.Color(0xdddddd);
         for(var i=0;i<1500;i++) {
         phi = Math.random()*2*Math.PI;
         theta = Math.random()*2*Math.PI;
         r = smallRange+interval*Math.random();
         var particle = new THREE.Vector3(
         r*Math.cos(theta)*Math.sin(phi),
         r*Math.sin(theta)*Math.sin(phi),
         r*Math.cos(phi)
         );
         geom.vertices.push(particle);
         geom.colors.push(color);
         }
         var system = new THREE.ParticleSystem(geom,material);
         return system;*/

        //cuboid approximation of deepSpace
        var geom = new THREE.Geometry();
        var material = new THREE.ParticleBasicMaterial({
            size: 4,
            transparent: true,
            opacity: Math.random(),
            sizeAttenuation: true
        });
        var range = 400;
        var width = range*2;
        var starDensity = 500;
        var randomWidth = 0;
        var randomHeight = 0;
        var color = new THREE.Color(0xdddddd);
        //front
        for(var i=0;i<starDensity;i++) {
            randomWidth = (Math.random()-0.5)*width;
            randomHeight = (Math.random()-0.5)*width;
            var particle = new THREE.Vector3(
                randomWidth,
                randomHeight,
                range
            );
            geom.vertices.push(particle);
            geom.colors.push(color);
        }
        //back
        for(var i=0;i<starDensity;i++) {
            randomWidth = (Math.random()-0.5)*width;
            randomHeight = (Math.random()-0.5)*width;
            var particle = new THREE.Vector3(
                randomWidth,
                randomHeight,
                -range
            );
            geom.vertices.push(particle);
            geom.colors.push(color);
        }
        //leftSide
        for(var i=0;i<starDensity;i++) {
            randomWidth = (Math.random()-0.5)*width;
            randomHeight = (Math.random()-0.5)*width;
            var particle = new THREE.Vector3(
                -range,
                randomWidth,
                randomHeight
            );
            geom.vertices.push(particle);
            geom.colors.push(color);
        }
        //rightSide
        for(var i=0;i<starDensity;i++) {
            randomWidth = (Math.random()-0.5)*width;
            randomHeight = (Math.random()-0.5)*width;
            var particle = new THREE.Vector3(
                range,
                randomWidth,
                randomHeight
            );
            geom.vertices.push(particle);
            geom.colors.push(color);
        }
        //top
        for(var i=0;i<starDensity;i++) {
            randomWidth = (Math.random()-0.5)*width;
            randomHeight = (Math.random()-0.5)*width;
            var particle = new THREE.Vector3(
                randomWidth,
                range,
                randomHeight
            );
            geom.vertices.push(particle);
            geom.colors.push(color);
        }
        //bottom
        for(var i=0;i<starDensity;i++) {
            randomWidth = (Math.random()-0.5)*width;
            randomHeight = (Math.random()-0.5)*width;
            var particle = new THREE.Vector3(
                randomWidth,
                -range,
                randomHeight
            );
            geom.vertices.push(particle);
            geom.colors.push(color);
        }
        var system = new THREE.ParticleSystem(geom,material);
        return system;
    }
};