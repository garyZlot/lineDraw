define(function(require) {
    var $ = require('jquery');

    var canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    $('#container').append(canvas);
    var cxt = canvas.getContext('2d');

    var Actor = require('./actor');
    var actor1 = new Actor('#container',cxt, {x:200,y:80,title:'管理员'});
    //var actor2 = new Actor('#container',cxt, {x:300,y:50,title:'普通用户'});
});