var baseUrl = window.location.protocol+"//"+window.location.hostname+window.location.pathname;
var httpReqReceiver = 'save.php';
var counter = 0; //0 is not valid item id, starting from 1
var clickedItem = null;

$(document).ready(
	
	function(){
		$('.source').draggable({
			helper: 'clone'
		});
		$('.target').droppable({
			accept: '.source',
			drop: handleDropCreateEvent
		});
		
		$.post(baseUrl+httpReqReceiver+'?operation=selectall', {}, loadingSuccess, 'text');
		
		$('body').click(bodyClickEvent);
		$(window).on('keypress', keyPressEvent);
		$('.hitpanel').hide();
		$('.hitbar').hover(hoverInOut);
		$('.hitpanel').hover(hitPanelHoverIn, hitPanelHoverOut);
	
	}
	
);
			
function handleDropCreateEvent( event, ui ) {
	
	$(this).append($(ui.draggable).clone());
	counter++;
	var itemNo = counter.toString();
	$(".target .source").addClass(itemNo);
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
	$("."+itemNo).click(clickEventHandler);
	
	$.post(baseUrl+httpReqReceiver+'?operation=create', {offset_top : offset_top_val.toString(), offset_left : offset_left_val.toString()}, createItemSuccess, 'text');
	
}

function createItemSuccess(data, textStatus, jqXHR) {
	
}

function loadingSuccess(data, textStatus, jqXHR) {
	
	var obj = jQuery.parseJSON(data);
	
	counter = obj.items.length;
	
	for(var itemCounter = 0; itemCounter < obj.items.length; itemCounter++) {
		
		$('.source').clone().appendTo('.target');
		
		$(".target .source").addClass("item"+obj.items[itemCounter].id);
		$(".item"+obj.items[itemCounter].id).removeClass("ui-draggable source");
		
		$(".item"+obj.items[itemCounter].id).css('position', 'absolute');
		$(".item"+obj.items[itemCounter].id).css('top', obj.items[itemCounter].offset_top + "px");
		$(".item"+obj.items[itemCounter].id).css('left', obj.items[itemCounter].offset_left + "px");
		$(".item"+obj.items[itemCounter].id).css('height', $('.source').css('height'));
		$(".item"+obj.items[itemCounter].id).css('width', $('.source').css('width'));
		$(".item"+obj.items[itemCounter].id).css('background-color', $('.source').css('background-color'));
		$(".item"+obj.items[itemCounter].id).draggable({
			containment: 'parent',
			stop: handleDropInsideEvent
		});
		$(".item"+obj.items[itemCounter].id).click(clickEventHandler);
		
	}
	
}

function handleDropInsideEvent( event, ui ) {
	
	var offset_top_val2 = $(this).offset().top - $(this).parent().offset().top;
	var offset_left_val2 = $(this).offset().left - $(this).parent().offset().left;
	
	var classNames = $(this).attr('class').split(' ');
	$.post(baseUrl+httpReqReceiver+'?operation=update', {id : classNames[0].substring(4), offset_top : offset_top_val2.toString(), offset_left : offset_left_val2.toString()}, updateItemSuccess, 'text');
	
}

function updateItemSuccess(data, textStatus, jqXHR) {
	
}

function clickEventHandler(event) {
	
	if(clickedItem == null) {
		
		$(event.target).css('background-color', "#9966FF");
		
	} else {
		
		$(clickedItem).css('background-color', $('.source').css('background-color'));
		$(event.target).css('background-color', "grey");
		
	}
	
	clickedItem = event.target;
	
}

function bodyClickEvent(event) {
	
	if(clickedItem != null) {
		
		if($(clickedItem).attr('class') != $(event.target).attr('class')) {
			$(clickedItem).css('background-color', $('.source').css('background-color'));
			clickedItem = null;
		}
		
	}
	
}

function keyPressEvent(event) {
	
	if((event.keyCode == 46) && (clickedItem != null)) {
		
		var classNames = $(clickedItem).attr('class').split(' ');
		$(clickedItem).remove();
		clickedItem = null;
		
		$.post(baseUrl+httpReqReceiver+'?operation=delete', {id : classNames[0].substring(4)}, deleteItemSuccess, 'text');
		
	}
	
}

function deleteItemSuccess(data, textStatus, jqXHR) {
	
}

function hoverInOut(event) {
	
	$('.hitpanel').show("slide", { direction: "left" }, 800);
	
}

function hitPanelHoverIn(event) {
	$('.hitpanel').show();
}

function hitPanelHoverOut(event) {
	$('.hitpanel').hide("slide", { direction: "left" }, 800);
}
