/**
 * Created by poczakos on 10/23/2014.
 */
kw.renderLoop = function() {
    kw.simulate(kw.clock.getDelta());
    // render using requestAnimationFrame
    kw.animationFrameID = window.requestAnimationFrame(kw.renderLoop);
    kw.renderer.render(kw.scene, kw.cameraHandler.camera);
};

kw.simulate = function(delta) {
    //kw.camera.rotateY(0.01);
    kw.cameraHandler.trackballControl.update(delta);
};

kw.endRenderLoop = function() {
    window.cancelAnimationFrame(kw.animationFrameID);
};
