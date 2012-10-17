<?php
	
	class JsonGenerator {
		
		public function generateJsonStr($objArray) {
			
			$items = array();
			$items['items'] = array();
			
			foreach($objArray as $key => $val)
  			{
				$item = $val;
				array_push($items['items'], array('id' => $item->getId(), 'offset_top' => $item->getOffsetTop(), 'offset_left' => $item->getOffsetLeft()));
  			}
			
			return json_encode($items);
			
		}
		
	}
	
?>
