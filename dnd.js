$(window).load(function() {
	
	$.post('http://localhost/jsdnd/save.php', {}, loadingSuccess, 'text');
	
});

function loadingSuccess(data, textStatus, jqXHR) {
	
	var obj = jQuery.parseJSON(data);
	
	$('.source').clone().appendTo('.target');
	
	$(".target .source").addClass("item"+obj.items[0].id);
	$(".item"+obj.items[0].id).removeClass("ui-draggable source");
	
	$(".item"+obj.items[0].id).css('position', 'absolute');
	$(".item"+obj.items[0].id).css('top', obj.items[0].offset_top + "px");
	$(".item"+obj.items[0].id).css('left', obj.items[0].offset_left + "px");
	$(".item"+obj.items[0].id).css('height', $('.source').css('height'));
	$(".item"+obj.items[0].id).css('width', $('.source').css('width'));
	$(".item"+obj.items[0].id).css('background-color', $('.source').css('background-color'));
	
}

$(document).ready(
	function(){
		$('.source').draggable({
			helper: 'clone'
		});
		$('.target').droppable({
			accept: '.source',
			drop: handleDropEvent
		});
});
			
function handleDropEvent( event, ui ) {
	$(this).append($(ui.draggable).clone());
	var randomnumber = Math.floor(Math.random()*11);
	var itemNo = "item" + randomnumber;
	$(".target .source").addClass(itemNo);
	$("."+itemNo).text(itemNo);
	$("."+itemNo).removeClass("ui-draggable source");
	$("."+itemNo).draggable({
		containment: 'parent'
	});
	$("."+itemNo).css('position', 'absolute');
	
	var offset_top_val = ui.offset.top - $(this).offset().top;
	var offset_left_val = ui.offset.left - $(this).offset().left;
	
	$("."+itemNo).css('top', offset_top_val);
	$("."+itemNo).css('left', offset_left_val);
	$("."+itemNo).css('height', $('.source').css('height'));
	$("."+itemNo).css('width', $('.source').css('width'));
	$("."+itemNo).css('background-color', $('.source').css('background-color'));
	
	$.post('http://localhost/jsdnd/save.php', {offset_top : offset_top_val.toString(), offset_left : offset_left_val.toString()}, success, 'text');
}

function success(data, textStatus, jqXHR) {
	alert(data);
}