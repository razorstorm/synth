var keyWidth = 42;
var blackKeyWidth = 26;
var bitLess = 5;
var mouseDown = false;
var chord = false;
var chordNotes = [];
var chordIDs = [];
//todo track the mousedown state. if mosue leaves window, just set mousedown to false.
$(document).ready(function(){
	generateKeys();
	
	$(".blackKey").mousedown(function(e){
		startNote($(this));
		mouseDown = true;
		e.preventDefault();
	}).mouseup(function(){
		mouseDown = false;
		if(!chord)
			$(this).removeClass("depressed");
	}).mouseout(function(){
		if(!chord)
			$(this).removeClass("depressed");
	}).mouseenter(function(){
		if(mouseDown)
		{
			startNote($(this));
		}
	});
	
	$(".whiteKey").mousedown(function(e){
		startNote($(this));
		mouseDown = true;
		e.preventDefault();
	}).mouseup(function(){
		mouseDown = false;
		if(!chord)
			$(this).removeClass("depressed");
	}).mouseout(function(){
		if(!chord)
			$(this).removeClass("depressed");
	}).mouseenter(function(){
		if(mouseDown)
		{
			startNote($(this));
		}
	});
	
	$('.octaveScroll').click(function(){
		var octaveNum = $(this).attr("octave");
		
		scrollToOctave(octaveNum);
	});
	
	$('#startChordButton').click(function()
	{
		chord = true;
		$(this).addClass("btn-success");
	});
	
	$('#endChordButton').click(function()
	{
		$('#startChordButton').removeClass("btn-success");
		chord = false;
		for( index in chordNotes)
		{
			startNote(chordNotes[index]);
			chordNotes[index].removeClass("depressed");
		}
		chordIDs = [];
		chordNotes = [];
	});
	
	MIDI.loadPlugin({
		instrument: "acoustic_grand_piano", // or 1 (default)
		callback: function() {removeLoadingScreen(); }
	});
	
	$("#keyboard").scrollLeft(14*keyWidth); //scroll to C3
	
});

function loadInstrument(instrument)
{

}

function scrollToOctave(octaveNum)
{
	$("#keyboard").scrollTo((octaveNum-1) * 7 * keyWidth, {duration: 200});
}
function removeLoadingScreen()
{
	$('#loading').hide();
}
function startNote(noteDOMElement)
{
	noteDOMElement.addClass("depressed");
	if(chord)
	{
		//todo: update 2 arrays
		if($.inArray(noteDOMElement.attr('id'),chordIDs)>-1)
		{
			noteDOMElement.removeClass("chord");
			noteDOMElement.removeClass("depressed");
			
			chordIDs.splice($.inArray(noteDOMElement.attr('id'),chordIDs),1);
			chordNotes.splice($.inArray(noteDOMElement.attr('id'),chordIDs),1);
		}
		else
		{
			noteDOMElement.addClass("chord");
			chordNotes.push(noteDOMElement);
			chordIDs.push(noteDOMElement.attr('id'));
		}
	}
	else
	{
		noteDOMElement.removeClass("chord");
		MIDI.noteOn(0,noteDOMElement.attr('midiNumber'),100);
	}
}

function stopAllNotes()
{
	
}
function generateKeys()
{
	var keyboard = $("#keys");
	
	var midiNumber = 24;
	var numKeys = 0;
	var octaveNumber = 1;
	while(midiNumber < 108)
	{
		midiNumber = generateOctave(keyboard, midiNumber, numKeys, octaveNumber);
		octaveNumber++;
		numKeys += 7;
	}

}

function generateOctave(keyboard, midiNumber, numKeys, octaveNumber)
{
	var positionOffset = numKeys * keyWidth;
	generateWhiteKey(keyboard, midiNumber++, 'C'+octaveNumber);
	generateBlackKey(keyboard, midiNumber++,positionOffset+ keyWidth - blackKeyWidth/2 - bitLess);
	generateWhiteKey(keyboard, midiNumber++, 'D'+octaveNumber);
	generateBlackKey(keyboard, midiNumber++,positionOffset+ 2*keyWidth - blackKeyWidth/2 + bitLess);
	generateWhiteKey(keyboard, midiNumber++, 'E'+octaveNumber);
	generateWhiteKey(keyboard, midiNumber++, 'F'+octaveNumber);
	generateBlackKey(keyboard, midiNumber++,positionOffset+ 4*keyWidth - blackKeyWidth/2 - bitLess);
	generateWhiteKey(keyboard, midiNumber++, 'G'+octaveNumber);
	generateBlackKey(keyboard, midiNumber++,positionOffset+ 5*keyWidth - blackKeyWidth/2);
	generateWhiteKey(keyboard, midiNumber++, 'A'+octaveNumber);
	generateBlackKey(keyboard, midiNumber++,positionOffset+ 6*keyWidth - blackKeyWidth/2 + bitLess);
	generateWhiteKey(keyboard, midiNumber++, 'B'+octaveNumber);
	
	return midiNumber
}
function generateWhiteKey(keyboard, midiNumber, noteName)
{
	keyboard.append('<div id="key_'+midiNumber+'" midiNumber="'+midiNumber+'" class="whiteKey"><div class="overlay"></div><div class="inset"></div><span class="keyName noSelect">'+noteName+'</span></div>');
}

function generateBlackKey(keyboard, midiNumber, offSet)
{
	keyboard.append('<div id="key_'+midiNumber+'" midiNumber="'+midiNumber+'" class="blackKey" style="left:'+offSet+'px"></div>');
}