<?php
	include 'Item.php';
	include 'ItemRepository.php';
	include 'JsonGenerator.php';
	
	extract($_POST);
	
	$itemRepository = new ItemRepository;
	$jsonGenerator = new JsonGenerator;
	
	echo $jsonGenerator->generateJsonStr($itemRepository->getAllItems());
	
?>
