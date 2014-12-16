
kw.KeyEventHandler = function(ball) {
    $("body").on("keydown", $.proxy(this.listenKeyDowns,this));
    $("body").on("keyup", $.proxy(this.listenKeyUps,this));
    this.ball = ball;

    this.pushedKeys = {};
    this.pushedKeys.forward = false;
    this.pushedKeys.left = false;
    this.pushedKeys.right = false;
    this.pushedKeys.jump = false;
};

kw.KeyEventHandler.prototype.listenKeyDowns = function(e) {
    switch(e.which) {
        case 38 :                                   //FORWARD
            if(!this.pushedKeys.forward) {
                this.pushedKeys.forward = true;
                this.ball.move();
            }
            break;
        case 37 :                                   //LEFT
            if(!this.pushedKeys.left) {
                this.pushedKeys.left = true;
                this.ball.rotate(Math.PI/2);
            }
            break;
        case 39 :                                   //RIGHT
            if(!this.pushedKeys.right) {
                this.pushedKeys.right = true;
                this.ball.rotate(-Math.PI/2);
            }
            break;
        case 32 :                                   //JUMP (space)
            if(!this.pushedKeys.jump) {
                this.pushedKeys.jump = true;
                //TODO jump implementation
            }
            break;
        case 83:                                    //'s' SWITCH CAMERA
            this.ball.switchCamera();
            break;
        case 66:                                    //'b' just for testing
            console.log("camera: "+kw.cameraHandler.camera.position.x+" "+kw.cameraHandler.camera.position.y+" "+kw.cameraHandler.camera.position.z);
            break;
    }
};

kw.KeyEventHandler.prototype.listenKeyUps = function(e) {
    switch(e.which) {
        case 38 :                                   //FORWARD
            this.pushedKeys.forward = false;
            break;
        case 37 :                                   //LEFT
            this.pushedKeys.left = false;
            break;
        case 39 :                                   //RIGHT
            this.pushedKeys.right = false;
            break;
        case 32 :                                   //JUMP (space)
            this.pushedKeys.jump = false;
            break;
    }
};

kw.KeyEventHandler.prototype.moveAnimationDone = function() {
    if(this.pushedKeys.forward) {
        this.ball.move();
    }
    else if(this.pushedKeys.left) {

    }
    else if(this.pushedKeys.right) {

    }
};

kw.KeyEventHandler.prototype.rotateAnimationDone = function() {
    if(this.pushedKeys.left) {
        this.ball.rotate(Math.PI/2);
    }
    else if(this.pushedKeys.right) {
        this.ball.rotate(-Math.PI/2);
    }
    else if(this.pushedKeys.forward) {
        this.ball.move();
    }
};

