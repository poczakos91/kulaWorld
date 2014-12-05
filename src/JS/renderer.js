/**
 * Created by poczakos on 10/23/2014.
 */
kw.renderLoop = function() {
    kw.simulate(kw.clock.getDelta());
    // render using requestAnimationFrame
    kw.animationFrameID = window.requestAnimationFrame(kw.renderLoop);
    kw.renderer.render(kw.scene, kw.camera);
};

kw.simulate = function(delta) {
    //kw.camera.rotateY(0.01);
    kw.orbitControls.update(delta);
};

kw.endRenderLoop = function() {
    window.cancelAnimationFrame(kw.animationFrameID);
};

kw.listenKeys = function(e) {
    switch (e.keyCode) {
        case 37:        //UP
            kw.camera.rotateY(0.006);
            break;
        case 39:        //DOWN
            kw.camera.rotateY(-0.006);
            break;
        case 38:        //LEFT
            kw.camera.rotateX(0.006);
            break;
        case 40:        //RIGHT
            kw.camera.rotateX(-0.006);
    }
};