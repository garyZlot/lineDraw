define(function(require, exports, module) {
    var $ = require('jquery');

    var mouseX = 0, mouseY = 0;
    var dragok = false;
    var actorInstance;
    var titleDiv;

    function doMove(e){
        if (dragok){
            actorInstance.x = e.pageX - $("canvas")[0].offsetLeft - 30;
            actorInstance.y = e.pageY - $("canvas")[0].offsetTop - 20;
        }
    }

    $("canvas").mousedown(function(e){
        mousePressed = true;
        var canvas = $("canvas")[0];
        var obj = actorInstance;
        if (e.pageX < obj.x + obj.width + canvas.offsetLeft && e.pageX > obj.x +canvas.offsetLeft &&
            e.pageY < obj.y + obj.height + canvas.offsetTop && e.pageY > obj.y + canvas.offsetTop){
                this.x = e.pageX - canvas.offsetLeft;
                this.y = e.pageY - canvas.offsetTop;
                dragok = true;
                canvas.onmousemove = doMove;
        }
    }).mouseup(function(){
        dragok = false;
        $("canvas")[0].onmousemove = null;
    });

    function clear() {
        $("canvas")[0].getContext('2d').clearRect(0, 0, $("canvas")[0].width, $("canvas")[0].height);
    }

    function Actor(container, cxt, config) {
        this.cxt = cxt;
        this.container = container;
        this.config = config;
        this.width = 60;
        this.height = 120;
        this.x = config.x;
        this.y = config.y;
        this.render();
        actorInstance = this;
        setInterval(function(){
            if (dragok) actorInstance.render();
        }, 30);
    }

    Actor.prototype.render = function() {
        clear();
        var x = this.x;
        var y = this.y;
        var w = this.width;
        var h = this.height;

        var centerX = x + w/2;
        var centerY = y + 15;
        this.cxt.beginPath();
        this.cxt.arc(centerX,centerY,15,0,Math.PI*2,true);
        this.cxt.moveTo((x + 10), (y + 40) + 0.5);
        this.cxt.lineTo((x + 50), (y + 40) + 0.5);

        this.cxt.moveTo((x + w/2), (y + 30));
        this.cxt.lineTo((x + w/2), (y + 50));
        this.cxt.lineTo((x + 10), (y + 70));

        this.cxt.moveTo((x + w/2), y + 50);
        this.cxt.lineTo((x + 50), (y + 70));

        this.cxt.closePath();
        this.cxt.stroke();

        if (!titleDiv) {
            titleDiv = $('<div>' + this.config.title + '</div>');
            $(container).append(titleDiv);
        }
        titleDiv.css({
            position:"absolute",
            width:60,
            left:x+10,
            top:y + 85
        });
        titleDiv.css("text-align", "center");
    }

    module.exports = Actor;

});