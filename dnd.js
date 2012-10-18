var counter = 0; //0 is not valid item id, starting from 1

$(document).ready(
	
	function(){
		$('.source').draggable({
			helper: 'clone'
		});
		$('.target').droppable({
			accept: '.source',
			drop: handleDropCreateEvent
		});
		
		$.post('http://localhost/persistent-dom/save.php?operation=selectall', {}, loadingSuccess, 'text');
	
	}
	
);
			
function handleDropCreateEvent( event, ui ) {
	
	$(this).append($(ui.draggable).clone());
	alert(counter);
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
	
	$.post('http://localhost/persistent-dom/save.php?operation=create', {offset_top : offset_top_val.toString(), offset_left : offset_left_val.toString()}, createItemSuccess, 'text');
	
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
		
	}
	
}

function handleDropInsideEvent( event, ui ) {
	
	var offset_top_val2 = $(this).offset().top - $(this).parent().offset().top;
	var offset_left_val2 = $(this).offset().left - $(this).parent().offset().left;
	
	var classNames = $(this).attr('class').split(' ');
	$.post('http://localhost/persistent-dom/save.php?operation=update', {id : classNames[0].substring(4, 5), offset_top : offset_top_val2.toString(), offset_left : offset_left_val2.toString()}, updateItemSuccess, 'text');
	
}

function updateItemSuccess(data, textStatus, jqXHR) {
	
}
