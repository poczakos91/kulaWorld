/**
 * Created by poczakos on 11/10/2014.
 */
kw.createStars = function() {
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
};