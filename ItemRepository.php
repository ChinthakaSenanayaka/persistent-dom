<?php
	
	class ItemRepository {
		
		private $con;
		
		private function openDb() {
			
			$this->con = mysql_connect("localhost","root","freebird");
			if (!$this->con)
  			{
  				die('Could not connect: ' . mysql_error());
  			}
			
			mysql_select_db("persistent_html_DOM", $this->con);
			
		}
		
		private function closeDb() {
			
			mysql_close($this->con);
			
		}
		
		public function getItem($item) {
			
			$this->openDb();
			$result = mysql_query("SELECT * FROM item WHERE id = '$item->getId()'");
			$itemRow = mysql_fetch_row($result);
			$newItem = new Item;
			$newItem->setId($itemRow['id']);
			$newItem->setOffsetTop($itemRow['offset_top']);
			$newItem->setOffsetLeft($itemRow['offset_left']);
			$this->closeDb();
			return $newItem;
			
		}
		
		public function getAllItems() {
			
			$items = array();
			
			$this->openDb();
			$result = mysql_query("SELECT * FROM item");
			
			while($row = mysql_fetch_array($result))
  			{
				$newItem = new Item;
				$newItem->setId($row['id']);
				$newItem->setOffsetTop($row['offset_top']);
				$newItem->setOffsetLeft($row['offset_left']);
				array_push($items, $newItem);
  			}
			
			$this->closeDb();
			return $items;
			
		}
		
		public function createItem($item) {
			
			$this->openDb();
			$doubleOffsetTop = floatval($item->getOffsetTop());
			$doubleOffsetLeft = floatval($item->getOffsetLeft());
			mysql_query("INSERT INTO item (offset_top, offset_left) VALUES ($doubleOffsetTop, $doubleOffsetLeft)");
			$this->closeDb();
			
		}
		
		public function updateItem($item) {
			
			$this->openDb();
			$intId = intval($item->getId());
			$doubleOffsetTop = floatval($item->getOffsetTop());
			$doubleOffsetLeft = floatval($item->getOffsetLeft());
			mysql_query("UPDATE item SET offset_top = $doubleOffsetTop, offset_left = $doubleOffsetLeft WHERE id = $intId");
			$this->closeDb();
			
		}
		
		public function deleteItem($item) {
			
			$this->openDb();
			$intId = intval($item->getId());
			mysql_query("DELETE FROM item WHERE id = $intId");
			$this->closeDb();
			
		}
		
	}
	
?>
