$(document).ready(function() {
	$('.expandable').click(function() {
		$(this).siblings('.toExpand').toggle();
		$(this).toggleClass("minimize");
	});

	$('#mainScreen').click(function() {
		console.log("asdf");
		$('.floating').fadeTo('fast', 0.5);
	});
	$('.floating').click(function() {
		$('.floating').fadeTo('fast', 0.9);
	});
	var jQueryCanvas = $('#mainScreen');

	$('#mainScreen').mouseup(function() {
		gravityWell.inactivate();
	});

	$('#mainScreen').mousedown(function() {

		gravityWell.activate();
	});
	$('#mainScreen').mousemove(function(e) {
		if (e.pageX || e.pageY) {
			mouseX = e.pageX;
			mouseY = e.pageY;
		} else {
			mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		mouseX -= jQueryCanvas.offset().left;
		mouseY -= jQueryCanvas.offset().top;

		gravityWell.position.x = mouseX;
		gravityWell.position.y = mouseY;
	});
	$('#gravitySlider').slider({
		min : 0,
		max : 20,
		step : 1,
		value : 2,
		slide : function(event, ui) {
			$('span#gravityDisplay').text(ui.value);
			force = ui.value;
		}
	});
	$('#gravityWellStrengthSlider').slider({
		min : 500,
		max : 10000,
		step : 500,
		value : 1000,
		slide : function(event, ui) {
			$('span#gravityWellStrengthDisplay').text(ui.value);
			gravityWell.setMass(ui.value);
		}
	});

	$('#massInteraction').change(function() {
		massInteraction = parseInt($(this).val());
	});
	$('#bgSlider').slider({
		min : 0,
		max : 100,
		step : 1,
		value : 10,
		slide : function(event, ui) {
			$('span#bgDisplay').text(ui.value);
			value=ui.value;
		}
	});
});

