define(function(require, exports, module) {
    var $ = require('jquery');

    var dragok = false;
    var instances = [];
    var arrows = [];
    var isClearMoveObj = false;
    var isMovingObj;

    function doMove(e){
        if (dragok){
            if (!isClearMoveObj) {
                clearShape(isMovingObj);
                isClearMoveObj = true;
            }
            isMovingObj.x = e.pageX - $("canvas")[0].offsetLeft - isMovingObj.width/2;
            isMovingObj.y = e.pageY - $("canvas")[0].offsetTop - isMovingObj.height/2;
        }
    }

    $("canvas").mousedown(function(e){
        mousePressed = true;
        var canvas = $("canvas")[1];
        for(var i=0; i<instances.length;i++) {
            var obj = instances[i];
            if (e.pageX < obj.x + obj.width + canvas.offsetLeft && e.pageX > obj.x +canvas.offsetLeft &&
                e.pageY < obj.y + obj.height + canvas.offsetTop && e.pageY > obj.y + canvas.offsetTop){

                isMovingObj = obj;
                dragok = true;
                canvas.onmousemove = doMove;
                break;
            }
        };
    }).mouseup(function(){
            for (var i=0; i<instances.length;i++) {
                instances[i].render(instances[i].cxt);
            }
            if (isMovingObj) isMovingObj.hoverCxt.clearRect(0, 0, $("canvas")[1].width, $("canvas")[1].height);
            dragok = false;
            isClearMoveObj = false;
            $("canvas")[1].onmousemove = null;
        });

    function init() {
        setInterval(function(){
            if (dragok) {
                if (isMovingObj) {
                    isMovingObj.hoverCxt.clearRect(0, 0, $("canvas")[1].width, $("canvas")[1].height);
                    isMovingObj.render(isMovingObj.hoverCxt);
                    drawSelectFrame(isMovingObj);

                    for (var i=0;i<arrows.length;i++){
                        if ((arrows[i].source == isMovingObj) || (arrows[i].target == isMovingObj)) {
                            arrows[i].render(arrows[i].hoverCxt);
                        }
                    }

                }
            }
        }, 30);
    }

    function clearShape(shape){
        shape.cxt.clearRect(0, 0, $("canvas")[0].width, $("canvas")[0].height);
        var ins;
        for (var i=0; i<instances.length; i++) {
            var ins = instances[i];
            if ( ins != shape && ins.source != shape && ins.target != shape) instances[i].render(shape.cxt);
        }
    }

    function addShape(shape){
        instances.push(shape);
    }

    function drawSelectFrame(shape){
        var cxt = shape.hoverCxt;
        var x = shape.x;
        var y = shape.y;
        var w = shape.width;
        var h = shape.height;

        cxt.beginPath();
        cxt.rect(x +.5, y +.5, 5, 5);
        cxt.rect(x + w - 5.5, y +.5, 5, 5);
        cxt.rect(x + w - 5.5, y + h - 5.5, 5, 5);
        cxt.rect(x +.5, y + h - 5.5, 5, 5);
        cxt.closePath();
        cxt.stroke();
    }

    function getAllInstances(){
        return instances;
    }

    function getMovedObj(){
        return isMovingObj;
    }

    function addArrow(arrow){
        arrows.push(arrow);
    }

    init();
    return {
        clearShape:clearShape,
        addShape: addShape,
        getAllInstances:getAllInstances,
        getMovedObj:getMovedObj,
        addArrow:addArrow
    }
});