define(function(require,exports,module){
        var $ = require('jquery');
        var base = require('./base');
        var isClearedOncxt = false;

        function Arrow(cxt, hoverCxt, config) {
            this.cxt = cxt;
            this.hoverCxt = hoverCxt;
            this.config = config;

            this.source = config.source;
            this.target = config.target;

            this.render(this.cxt);
            base.addShape(this);
            base.addArrow(this);

            return this;
        }

        Arrow.prototype.render = function(cxt) {
            var s = this.source;
            var t = this.target;
            this.xOffset = (s.x<t.x) ? 1 : -1;
            this.yOffset = (s.y<t.y) ? 1 : -1;
            this.width = Math.abs(s.x - t.x) - ((this.xOffset==1) ? s.width : t.width);
            this.height = Math.abs((s.y + s.height/2) - (t.y + t.height/2));


            this.x = s.x + ((s.x < t.x) ? s.width : 0);
            this.y = s.y + s.height/2;

            var x = this.x;
            var y = this.y;
            var w = this.width;
            var h = this.height;

            cxt.beginPath();
            cxt.moveTo(x,y);
            cxt.lineTo(x + w*this.xOffset, y + h*this.yOffset);
            cxt.closePath();
            cxt.stroke();
        }


        module.exports = Arrow;
    }
)