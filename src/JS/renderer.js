
kw.renderLoop = function() {
    kw.simulate(kw.clock.getDelta());
    // render using requestAnimationFrame
    kw.animationFrameID = window.requestAnimationFrame(kw.renderLoop);
    kw.renderer.render(kw.scene, kw.cameraHandler.camera);
};

kw.simulate = function(delta) {
    kw.map.ball.update(delta);
};

kw.endRenderLoop = function() {
    window.cancelAnimationFrame(kw.animationFrameID);
};
