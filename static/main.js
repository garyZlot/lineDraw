define(function(require) {
    var $ = require('jquery');

    var canvas = document.createElement('canvas');
    var hoverCanvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    hoverCanvas.width = 800;
    hoverCanvas.height = 600;
    canvas.style.background = "red";

    $('#container').append(canvas);
    $('#container').append(hoverCanvas);
    var cxt = canvas.getContext('2d');
    var hoverCxt = hoverCanvas.getContext('2d');

    var Actor = require('./actor');
    var actor1 = new Actor(cxt, hoverCxt, {x:200,y:80});
    var actor2 = new Actor(cxt, hoverCxt, {x:300,y:50});
    var actor3 = new Actor(cxt, hoverCxt, {x:100,y:50});
    var actor4 = new Actor(cxt, hoverCxt, {x:500,y:150});

    var UseCase = require('./usecase');
    var usecase1 = new UseCase(cxt, hoverCxt, {x:460, y:200});

    var Arrow = require('./arrow');
    var arrow1 = new Arrow(cxt, hoverCxt, {source:actor1, target:usecase1});
});