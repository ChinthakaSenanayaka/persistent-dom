<?php
	
	class Item {
		
		private $id;
		private $offsetTop;
		private $offsetLeft;
		
		public function setId($itemId) {
			
			$this->id = $itemId;
			
		}
		
		public function getId() {
			
			return $this->id;
			
		}
		
		public function setOffsetTop($offsetTopVal) {
			
			$this->offsetTop = $offsetTopVal;
			
		}
		
		public function getOffsetTop() {
			
			return $this->offsetTop;
			
		}
		
		public function setOffsetLeft($offsetLeftVal) {
			
			$this->offsetLeft = $offsetLeftVal;
			
		}
		
		public function getOffsetLeft() {
			
			return $this->offsetLeft;
			
		}
		
	}
	
?>
