// Settings
var contentWidth = 4500;
var contentHeight = 4500;

// Intialize layout
var container = document.getElementById("container");
var content = document.getElementById("content");

content.style.width = contentWidth + "px";
content.style.height = contentHeight + "px";

var clientWidth = 0;
var clientHeight = 0;

// Initialize Scroller
this.scroller = new Scroller(render, {
	zooming: true,
	scrollingX : true,
	scrollingY : true,
	animating : true,
	animationDuration : 250,
	bouncing : true,
	locking : true,
	paging : false,
	snapping : false,
	minZoom : 0.36,
	maxZoom : 3
});

var rect = container.getBoundingClientRect();
scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);

// Reflow handling
var reflow = function() {
	clientWidth = container.clientWidth;
	clientHeight = container.clientHeight;
	scroller.setDimensions(clientWidth, clientHeight, contentWidth, contentHeight);
};

window.addEventListener("resize", reflow, false);
reflow();



var mousedown = false;

container.addEventListener("mousedown", function(e) {
	if (e.target.tagName.match(/input|textarea|select/i)) {
		return;
	}
	
	scroller.doTouchStart([{
		pageX: e.pageX,
		pageY: e.pageY
	}], e.timeStamp);

	mousedown = true;
}, false);

document.addEventListener("mousemove", function(e) {
	if (!mousedown) {
		return;
	}
	
	scroller.doTouchMove([{
		pageX: e.pageX,
		pageY: e.pageY
	}], e.timeStamp);

	mousedown = true;
}, false);

document.addEventListener("mouseup", function(e) {
	if (!mousedown) {
		return;
	}
	
	scroller.doTouchEnd(e.timeStamp);

	mousedown = false;
}, false);

container.addEventListener(navigator.userAgent.indexOf("Firefox") > -1 ? "DOMMouseScroll" :  "mousewheel", function(e) {
	scroller.doMouseZoom(e.detail ? (e.detail * -120) : e.wheelDelta, e.timeStamp, e.pageX, e.pageY);
}, false);
