<?php
	
	class ItemRepository {
		
		private $db_host_val;
		private $db_user_val;
		private $db_password_val;
		private $db_name_val;
		
		private $con;
		
		function __construct($db_host, $db_user, $db_password, $db_name) {
			
			$this->db_host_val = $db_host;
			$this->db_user_val = $db_user;
			$this->db_password_val = $db_password;
			$this->db_name_val = $db_name;
			
		}
		
		private function openDb() {
			
			$this->con = mysql_connect($this->db_host_val, $this->db_user_val, $this->db_password_val);
			if (!$this->con)
  			{
  				die('Could not connect: ' . mysql_error());
  			}
			
			mysql_select_db($this->db_name_val, $this->con);
			
		}
		
		private function closeDb() {
			
			mysql_close($this->con);
			
		}
		
		public function getItem($item) {
			
			$this->openDb();
			$intId = intval($item->getId());
			$result = mysql_query("SELECT * FROM item WHERE id = $intId");
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
