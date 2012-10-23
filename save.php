<?php
	include 'Item.php';
	include 'ItemRepository.php';
	include 'JsonGenerator.php';
	
	extract($_POST);
	extract($_GET);
	
	$itemRepository = new ItemRepository("localhost", "***", "***", "persistent_dom");
	$jsonGenerator = new JsonGenerator;
	
	if($operation === "selectall") {
	
		echo $jsonGenerator->generateJsonStr($itemRepository->getAllItems());
		
	} else if($operation === 'select') {
		
		
		
	} else if($operation === 'create') {
		
		$itemObj = new Item;
		$itemObj->setOffsetTop($offset_top);
		$itemObj->setOffsetLeft($offset_left);
		$itemRepository->createItem($itemObj);
		
	} else if($operation === 'update') {
		
		$itemObj = new Item;
		$itemObj->setId($id);
		$itemObj->setOffsetTop($offset_top);
		$itemObj->setOffsetLeft($offset_left);
		$itemRepository->updateItem($itemObj);
		
	} else if($operation === 'delete') {
		
		$itemObj = new Item;
		$itemObj->setId($id);
		$itemRepository->deleteItem($itemObj);
		
	}
	
?>
