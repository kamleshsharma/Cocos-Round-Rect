var RectType = {
    TOP: 1,      // Only top side corners will be rounded
    BOTTOM: 2,   // Only bottom side corners will be rounded
    RIGHT: 3,    // Only right side corners will be rounded
    LEFT: 4,     // Only left side corners will be rounded
}

var RoundRect = cc.DrawNode.extend({
    ctor: function (width, height, fillColor, lineWidth = 1, lineColor, borderRadius, type) {
		this._super();
		function getVertices(origin, destination, fillColor, lineWidth, lineColor, rad, type) {
			var vertices = [],
				radius = rad || 8,
				segments = 20,
				coef = 2.0 * Math.PI / segments,
				center = { x: 0, y: 0 };
			if (type !== RectType.TOP) {
				//Drawing bottom line
				if (type === RectType.RIGHT) {
					vertices.push(cc.p(origin.x, origin.y));
				} else {
					vertices.push(cc.p(origin.x + radius, origin.y));
				}
				//Drawing bottom right curve
				if (type !== RectType.LEFT) {
					center = {
						x: destination.x - radius,
						y: origin.y + radius
					}
					for (var i = segments / 2; i <= (segments - segments / 4); i++) {
						var rads = i * coef,
							j = radius * Math.cos(rads + cc.degreesToRadians(90)) + center.x,
							k = radius * Math.sin(rads + cc.degreesToRadians(90)) + center.y;
						vertices.push(cc.p(j, k));
					}
				} else {
					vertices.push(cc.p(destination.x, origin.y));
				}
			} else {
				vertices.push(cc.p(origin.x, origin.y));
				vertices.push(cc.p(destination.x, origin.y));
			}

			if (type !== RectType.BOTTOM && type !== RectType.LEFT) {
				//Drawing top right curve
				center = {
					x: destination.x - radius,
					y: destination.y - radius
				}
				for (var i = (segments - segments / 4); i <= segments; i++) {
					var rads = i * coef,
						j = radius * Math.cos(rads + cc.degreesToRadians(90)) + center.x,
						k = radius * Math.sin(rads + cc.degreesToRadians(90)) + center.y;
					vertices.push(cc.p(j, k));
				}
			} else {
				vertices.push(cc.p(destination.x, destination.y));
			}

			if (type !== RectType.BOTTOM && type !== RectType.RIGHT) {
				//Drawing top left curve
				center = {
					x: origin.x + radius,
					y: destination.y - radius
				}
				for (var i = 0; i <= segments / 4; i++) {
					var rads = i * coef,
						j = radius * Math.cos(rads + cc.degreesToRadians(90)) + center.x,
						k = radius * Math.sin(rads + cc.degreesToRadians(90)) + center.y;
					vertices.push(cc.p(j, k));
				}
			} else {
				vertices.push(cc.p(origin.x, destination.y));
			}

			if (type !== RectType.TOP && type !== RectType.RIGHT) {
				//Drawing bottom left curve
				center = {
					x: origin.x + radius,
					y: origin.y + radius
				}
				for (var i = segments / 4; i <= segments / 2; i++) {
					var rads = i * coef,
						j = radius * Math.cos(rads + cc.degreesToRadians(90)) + center.x,
						k = radius * Math.sin(rads + cc.degreesToRadians(90)) + center.y;
					vertices.push(cc.p(j, k));
				}
			} else {
				vertices.push(cc.p(origin.x, origin.y));
			}
			return vertices;
		}
		this.width = width;
		this.height = height;
		lineColor = lineColor || this.getDrawColor();

		[lineColor, (fillColor || {})].forEach(function (obj) {
			obj.a = obj.a != null ? obj.a : 255
		})

		if (fillColor) {
			this.drawPoly(getVertices(cc.p(0, 0), cc.p(width, height), fillColor, lineWidth, lineColor, borderRadius, type), fillColor, lineWidth, lineColor || cc.color(255, 255, 255));
		} else {
			var defaultColor = cc.color(128, 0, 0); //color for background node
			this.drawPoly(getVertices(cc.p(0, 0), cc.p(width, height), fillColor, lineWidth, lineColor, borderRadius, type), defaultColor, lineWidth, defaultColor);
		}
    },
});