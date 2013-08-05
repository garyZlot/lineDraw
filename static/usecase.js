define(function(require, exports, module) {
    var $ = require('jquery');
    var base = require('./base');

    function UseCase(cxt, hoverCxt, config) {
        this.cxt = cxt;
        this.hoverCxt = hoverCxt;
        this.config = config;

        this.width = 100;
        this.height = 60;
        this.x = config.x;
        this.y = config.y;
        this.render(this.cxt);
        base.addShape(this);

        return this;
    }

    UseCase.prototype.render = function(cxt) {
        var x = this.x;
        var y = this.y;
        var w = this.width;
        var h = this.height;

        var centerX = x + w/2;
        var centerY = y + h/2;

        drawEllipse(cxt, x, y, w, h);
    }

    function drawEllipse(cxt, x, y, w, h) {
        var kappa = .5522848,
            ox = (w / 2) * kappa, // control point offset horizontal
            oy = (h / 2) * kappa, // control point offset vertical
            xe = x + w,           // x-end
            ye = y + h,           // y-end
            xm = x + w / 2,       // x-middle
            ym = y + h / 2;       // y-middle

        cxt.beginPath();
        cxt.moveTo(x, ym);
        cxt.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        cxt.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        cxt.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        cxt.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        cxt.closePath();
        cxt.stroke();
    }

    module.exports = UseCase;

});