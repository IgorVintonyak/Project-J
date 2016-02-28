var collidesWith = function(a, b) {
	return a.y < (b.y + b.width) && a.x < (b.x + b . width) && b.x < (a.x + a.width) && b.y < (a.y + a.height);
};

var resolveCollision = function(a, b) {
	var aCenterX = a.x - a.width;
	var aCenterY = a.y - a.height;

	var bCenterX = b.x - b.width;
	var bCenterY = b.y - b.height;

	var xOverlay = 0;
	var yOverlay = 0;

	var result = -1;

	if (aCenterX > bCenterX) {
		xOverlay = (b.x + b.width) - a.x;
	} else {
		xOverlay = b.x - (a.x + a.width);
	}

	if (aCenterY > bCenterY) {
		yOverlay = (b.y + b.height) - a.y;
	} else {
		yOverlay = b.y - (a.y + a.height); 
	}

	if (Math.abs(xOverlay) < Math.abs(yOverlay)) {
		a.x += xOverlay;
		if (aCenterX < bCenterX) {
			result = 1;
		} else {
			result = 3;
		}
	} else {
		a.y += yOverlay;
		if (aCenterY < bCenterY) {
			result = 2;
		} else {
			result = 0;
		}
	}

	return result;
};