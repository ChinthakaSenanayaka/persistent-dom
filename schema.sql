create database if not exists persistent_html_DOM;
use persistent_html_DOM

CREATE TABLE IF NOT EXISTS `item` (
  	`id` int(10) NOT NULL AUTO_INCREMENT,
  	`offset_top` float(50) default 0.0,
  	`offset_left` float(50) default 0.0,
  	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;