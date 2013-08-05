define(function(require, exports, module) {
    var $ = require('jquery');
    var base = require('./base');

    function Actor(cxt, hoverCxt, config) {
        this.cxt = cxt;
        this.hoverCxt = hoverCxt;
        this.config = config;

        this.width = 60;
        this.height = 80;
        this.x = config.x;
        this.y = config.y;
        this.render(this.cxt);
        base.addShape(this);

        return this;
    }

    Actor.prototype.render = function(cxt) {
        var x = this.x;
        var y = this.y;
        var w = this.width;
        var h = this.height;

        var centerX = x + w/2;
        var centerY = y + 20;
        cxt.beginPath();
        cxt.arc(centerX,centerY,15,0,Math.PI*2,true);
        cxt.moveTo((x + 10), (y + 40) + 0.5);
        cxt.lineTo((x + 50), (y + 40) + 0.5);

        cxt.moveTo((x + w/2), (y + 35));
        cxt.lineTo((x + w/2), (y + 50));
        cxt.lineTo((x + 10), (y + 70));

        cxt.moveTo((x + w/2), (y + 50));
        cxt.lineTo((x + 50), (y + 70));

        cxt.closePath();
        cxt.stroke();
    }

    module.exports = Actor;

});