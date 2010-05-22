var map;

function toHex(dec) {
    var hexCharacters = "0123456789ABCDEF";
    if (dec < 0)
        return "00";
    if (dec > 255)
        return "FF";

    var i = Math.floor(dec / 16);
    var j = dec % 16;
    return hexCharacters.charAt(i) + hexCharacters.charAt(j);
}


function initMap() {
    map = Raphael("map", 1600, 600);
    // var fill = map.rect(0, 0, 1600, 600).attr("fill", /*"#0C45CF"*/"#111133");
    for (var i = 0; i < m.countries.length; i++) {
        drawCountry(m.countries[i].outline, m.countries[i].center);
    }
}

function drawCountry(points, center, color) {
    
    if (!$defined(color)) {
        var color = "#"+toHex(rand(50,200));
        color += toHex(rand(50,200));
        color += toHex(rand(50,200));
    }
    
    var line = "M " + points[0].x + " " + points[0].y;
    for (var i = 1; i < points.length; i++) {
        line += "L " + points[i].x + " " + points[i].y;
    }
    line += " Z";
        
    line = map.path(line).attr("fill", color);
    
    if ($defined(center))
        var b = map.circle(center.x, center.y, 5).attr("fill", color);
}

function drawUnusedHexagons(hexagons) {
    var length = hexagons.length;
    for (var i = 0; i < length; i++) {
        if (hexagons[i].used == false)
            drawLines(hexagons[i].lines, "#ff0000");
    }
}

function drawLines(lines, color) {       
    for (var i = 0; i < lines.length; i++) {
        var line = "M " + lines[i].points[0].x + " " + lines[i].points[0].y;
        line += "L " + lines[i].points[1].x + " " + lines[i].points[1].y;
        line = map.path(line).attr({stroke: color});
    }
}



