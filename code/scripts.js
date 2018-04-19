// var _ = require('underscore');


//
var controllers = [];
var actions = [];
var selectedAction = false;
var selectedController = false;  

for(var v in videoMetadata) {
	if (!controllers.includes(videoMetadata[v][1])) {
		controllers.push(videoMetadata[v][1]);
	}
	if (!actions.includes(videoMetadata[v][2])) {
		actions.push(videoMetadata[v][2]);
	}
}

console.log(controllers + " : " + actions);

var tagsDiv = $('#aTags');

actions = actions.sort();
controllers = controllers.sort();
// actions.unshift("a game");
// controllers.unshift("controller");

for(var i in actions) {
	var tagButton = $('<button>', {
		value: actions[i],
	});
	tagButton.html(actions[i]);
	tagButton.click(function(event){
		if (selectedAction == false) {
			$(this).toggleClass("selectedAction");
			selectedAction = this.value
		} else if ($(this).hasClass("selectedAction")) {
			$(this).toggleClass("selectedAction");
			selectedAction = false;
		} else {
			$('button').removeClass("selectedAction");
			$(this).toggleClass("selectedAction");
			selectedAction = this.value;
		}
		tagSelected($(this));
	})
	tagButton.appendTo($('#actions'));
}

for(var i in controllers) {
	var tagButton = $('<button>', {
		value: controllers[i],
	});
	tagButton.html(controllers[i]);
	tagButton.click(function(event){
		if (selectedController == false) {
			$(this).toggleClass("selectedController");
			selectedController = this.value
			// $('html, button, video').css('cursor', 'url(../controllerimages/' + this.value.split(" ").join("") + '.png) 30 30, pointer');
		} else if ($(this).hasClass("selectedController")) {
			$(this).removeClass("selectedController");
			selectedController = false;
			// $('html, button, video').css('cursor', 'auto');
		} else {
			$('button').removeClass("selectedController");
			$(this).toggleClass("selectedController");
			// $('html, button, video').css('cursor', 'url(../controllerimages/' + this.value.split(" ").join("") + '.png) 30 30, pointer');
			selectedController = this.value;
		}
		tagSelected($(this));
	});
	tagButton.appendTo($('#controllers'));
}


function tagSelected(button) {
	// Make all buttons grey
	$('button').addClass("viableButton");
	$('video').hide();
	var videos; 

	if(!selectedController && !selectedAction) {
		$('button').removeClass("viableButton");
	} 

	if(selectedController && !selectedAction) {
		videos = $('#videos video[controller='+selectedController.split(" ").join("")+']');
		videos.show();

		var actionsForController = jQuery.unique(videos.map(function(){return $(this).attr("action");}));
		jQuery.each(actionsForController, function(index, value){
			$("button").map(function() {
				if($(this).val().replace(/\s/g, "") === value) {
					$(this).toggleClass("viableButton");
				};
			});
			// $('button[value*='+value+']').toggleClass("viableButton");
		});
	}

	if(!selectedController && selectedAction) {
		videos = $('#videos video[action='+selectedAction.split(" ").join("")+']');
		videos.show();

		var controllersForAction = jQuery.unique(videos.map(function(){return $(this).attr("controller");}));
		jQuery.each(controllersForAction, function(index, value){
			$("button").map(function() {
				if($(this).val().replace(/\s/g, "") === value) {
					$(this).toggleClass("viableButton");
				};
			});
		});
	}

	if(selectedController && selectedAction) {
		videos = $('video[action='+selectedAction.split(" ").join("")+'][controller='+selectedController.split(" ").join("")+']')
		videos.show();
	}

	$(this).toggleClass("viableButton");

	$('#miniVideos').empty();
	for (var i = 0; i < videos.length; i++) {
		var vidButton = $('<button>', {
			class: "vidButton",
			id: i
		})
		vidButton.click(function() {
			console.log(this.i);
		})
		vidButton.appendTo($('#miniVideos'));
	}

	console.log(videos.length);
}


$(function () {
	for(var v in videoMetadata) {
		var video = $('<video>', {
			// width: $('#videos').width(),
			// height: $('#videos').height(),
			src: ('../video/' + videoMetadata[v][0]),
			class: "grid-item",
			action: videoMetadata[v][2].split(" ").join(""),
			controller: videoMetadata[v][1].split(" ").join("")
		})
		video.mouseenter(function(event) {
			this.play();
		}).mouseleave(function(event) {
			this.pause();
		})
		video.appendTo($('#videos'));
		video.show();
	}

	$("video").bind('ended', function(){
     	this.play();
	});
});

// $(window).resize(function(){
// 		$("#videoContainer").width($(window).width() - 600);
// });






