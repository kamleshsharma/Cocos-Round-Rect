# Cocos-Round-Rect

It is the cocos draw node class that can be used to make rounded rect

HOW TO USE IT:

Copy and paste Roundrect.js into your project folder and add it to your project.js JSON file

For Example:

var firstRoundRect = new RoundRect(width, height, bgColor, borderWidth, borderColor, borderRadius, type);

@param {Number} [height]  = Hieght of rounded rectangle

@param {Number} [width]  = Width of rounded rectangle

@param {cc.Color|null}  = fillColor Fill color rounded rectangle else some default will be applied.

@param {Number} [lineWidth] = Width of the border

@param {cc.Color|null} = lineColor Line color rounded rectangle else some default will be applied.

@param {Number} [radiusWidth] = Width of corner radius

@param {Number} [type] = Type of rounded rectangle i.e.  TOP, BOTTOM, RIGHT, LEFT, If passed NULL all the corners will be rounded
      The possible values can be
      cc.DrawNode.RoundRectType.TOP     // Only top side corners will be rounded
      cc.DrawNode.RoundRectType.BOTTOM  // Only bottom side corners will be rounded
      cc.DrawNode.RoundRectType.RIGHT   // Only right side corners will be rounded
      cc.DrawNode.RoundRectType.LEFT    // Only left side corners will be rounded
      
      
      
Note:
The Above example works well when compile for native platform
It has dependecies on cc.drawnode