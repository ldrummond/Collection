
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS

function parseMetadata() {
	for(var v in videoMetadata) {
		if (!controllers.includes(videoMetadata[v][1])) {
			controllers.push(videoMetadata[v][1]);
		}
		if (!actions.includes(videoMetadata[v][2])) {
			actions.push(videoMetadata[v][2]);
		}
	}	

	actions = actions.sort();
	controllers = controllers.sort();
	// actions.unshift("a game");
	// controllers.unshift("controller");
}


function addActions() {
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
}


function addControllers() {
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
}


function tagSelected(button) {
	// Make all buttons grey
	$('button').addClass("viableButton");
	$('video').hide();
	$('#miniVideos').hide();
	var videos; 

	if(!selectedController && !selectedAction) {
		$('button').removeClass("viableButton");
	} 

	if(selectedController && !selectedAction) {
		videos = $('#videos video[controller='+selectedController.split(" ").join("")+']');

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

	}

	videos.show();

	$(this).toggleClass("viableButton");

	$('#miniVideos').empty();
	for (var i = 0; i < videos.length; i++) {
		var vidButton = $('<button>', {
			class: "vidButton",
			id: i
		})
		vidButton.appendTo($('#miniVideos'));
		$('#miniVideos').show();
	}
}

function loadVideos(videoArr) {
	// var buffer = jQuery.map(videoArr, function(a) {
	// 	return a[0];
	// });
	var buffer = videoArr;

	for(var v in videoArr) {
			var video = $('<video>', {
				src: ('../video/' + videoArr[v][0]),
				class: "grid-item",
				action: videoArr[v][2].split(" ").join(""),
				controller: videoArr[v][1].split(" ").join(""),
				name: videoArr[v][0],
				caption: "using " + videoArr[v][4] + " to play " + videoArr[v][3]
			})
			
			video.appendTo($('#videos'));
			video.show();
			video.on("loadeddata", function() {
				var name = $(this).attr("name");
				buffer = jQuery.grep(buffer, function(value) {
				  return value[0] != name;
				});
				// console.log(buffer);
			});
	}

	$("video").mouseenter(function(event) {
			this.play();
			$('#vidTitle').html($(this).attr("caption"));
			if ($(this).attr("caption").length > 47) {
				$('#vidTitle').addClass("small");
			} else {
				$('#vidTitle').removeClass("small");
			}
		}).mouseleave(function(event) {
			this.pause();
	})

	$("video").bind('ended', function(){
     	this.play();
	});

	if (!(buffer.length == 0)) {
		// loadVideos(buffer);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MAIN

var controllers = [];
var actions = [];
var selectedAction = false;
var selectedController = false; 
var tagsDiv = $('#aTags');

parseMetadata();
addActions();
addControllers();
loadVideos(videoMetadata);

$('#miniVideos').empty();
console.log("mini");
console.log($('video').length);
for (var i = 0; i < $('video').length; i++) {
	var vidButton = $('<button>', {
		class: "vidButton",
		id: i
	})
	
	vidButton.appendTo($('#miniVideos'));
}

// $('#miniVideos button').click(() => {
// 	console.log(this.attr(id))
// })








