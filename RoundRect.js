var RectType = {
    TOP:'top',
    BOTTOM:'bottom',
    RIGHT:'right',
    LEFT:'left',
}
function getVertices(origin, destination, fillColor, lineWidth, lineColor, type, rad = null){
    var vertices = [];
    var radius = rad || 8;
    var segments = 20;
    var coef = 2.0 * Math.PI / segments;
    var center = null;
    if(type !== RectType.TOP){
        //bottom line
        if(type === RectType.RIGHT){
            vertices.push(cc.p(origin.x, origin.y));
        }else{
            vertices.push(cc.p(origin.x + radius, origin.y));
        }
        //bottom right curve
        if(type !== RectType.LEFT){
            center = {
                x: destination.x - radius,
                y: origin.y + radius
            } 
            for (var i = segments/2; i <= (segments - segments/4); i++) {
                var rads = i * coef;
                var j = radius * Math.cos(rads + cc.degreesToRadians(90)) + center.x;
                var k = radius * Math.sin(rads + cc.degreesToRadians(90)) + center.y;
                vertices.push(cc.p(j, k));
            }            
        }else{
            vertices.push(cc.p(destination.x, origin.y));
        }
    }else{
        vertices.push(cc.p(origin.x, origin.y));
        vertices.push(cc.p(destination.x, origin.y));
    }
    
    if(type !== RectType.BOTTOM && type !== RectType.LEFT){
        //top right curve
        center = {
            x: destination.x - radius,
            y: destination.y - radius
        }
        for (var i = (segments - segments/4); i <= segments; i++) {
            var rads = i * coef;
            var j = radius * Math.cos(rads + cc.degreesToRadians(90)) + center.x;
            var k = radius * Math.sin(rads + cc.degreesToRadians(90)) + center.y;
            vertices.push(cc.p(j, k));
        }
    }else{
        vertices.push(cc.p(destination.x, destination.y));
    }

    if(type !== RectType.BOTTOM && type !== RectType.RIGHT){
        //top left curve
        center = {
            x: origin.x + radius,
            y: destination.y - radius
        } 
        for (var i = 0; i <= segments/4; i++) {
            var rads = i * coef;
            var j = radius * Math.cos(rads + cc.degreesToRadians(90)) + center.x;
            var k = radius * Math.sin(rads + cc.degreesToRadians(90)) + center.y;
            vertices.push(cc.p(j, k));
        }
    }else{
        vertices.push(cc.p(origin.x, destination.y));
    }

    if(type !== RectType.TOP && type !== RectType.RIGHT){
        //bottom left curve
        center = {
            x: origin.x + radius,
            y: origin.y + radius
        } 
        for (var i = segments/4; i <= segments/2; i++) {
            var rads = i * coef;
            var j = radius * Math.cos(rads + cc.degreesToRadians(90)) + center.x;
            var k = radius * Math.sin(rads + cc.degreesToRadians(90)) + center.y;
            vertices.push(cc.p(j, k));
        }                
    }else{
        vertices.push(cc.p(origin.x, origin.y));
    }
    return vertices;
}

var RoundRect = cc.DrawNode.extend({
    ctor: function(width, height, fillColor, lineWidth = 1, lineColor, type = null, rad = null){
        this._super();
        this.width = width;
        this.height = height;
        lineColor = lineColor || this.getDrawColor();

        [lineColor, (fillColor || {})].forEach(function(obj){ obj.a = obj.a != null ? obj.a : 255 })
        
        if(fillColor /*&& fillColor instanceof cc.Color*/){
            this.drawPoly(getVertices(cc.p(0, 0), cc.p(width, height), fillColor, lineWidth, lineColor, type, rad), fillColor, lineWidth, lineColor || cc.color(255,255,255));
        }else{
            var defaultColor = cc.color(128, 0, 0); //color for background node
            this.drawPoly(getVertices(cc.p(0, 0), cc.p(width, height), fillColor, lineWidth, lineColor, type, rad), defaultColor, lineWidth, defaultColor);
        }
    },
    drawRoundRect: function (origin, destination, fillColor, lineWidth, lineColor, type, rad = null) {
        if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
            lineWidth = (lineWidth == null) ? this._lineWidth : lineWidth;
            lineColor = lineColor || this.getDrawColor();
            if(lineColor.a == null)
                lineColor.a = 255;
            var element = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
            element.verts = getVertices(origin, destination, fillColor, lineWidth, lineColor, type, rad);
            element.lineWidth = lineWidth;
            element.lineColor = lineColor;
            element.isClosePolygon = true;
            element.isStroke = true;
            element.lineCap = "butt";
            element.fillColor = fillColor;
            if (fillColor) {
                if(fillColor.a == null)
                    fillColor.a = 255;
                element.isFill = true;
            }
            this._buffer.push(element);
        }
        else if(cc._renderType === cc.game.RENDER_TYPE_WEBGL || cc._renderType === cc.game.RENDER_TYPE_OPENGL){
            lineWidth = (lineWidth == null) ? this._lineWidth : lineWidth;
            lineColor = lineColor || this.getDrawColor();
            if (lineColor.a == null)
                lineColor.a = 255;
            if(fillColor == null)
                this._drawSegments(getVertices(origin, destination, fillColor, lineWidth, lineColor, type, rad), lineWidth, lineColor, true);
            else
                this.drawPoly(getVertices(origin, destination, fillColor, lineWidth, lineColor, type, rad), fillColor, lineWidth, lineColor);
        }
    }
});