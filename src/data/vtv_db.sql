###Database creation###
SET FOREIGN_KEY_CHECKS=0;
UNLOCK TABLES;

CREATE DATABASE IF NOT EXISTS `vtv_db`;
USE `vtv_db`;

###Tables creation###

	/*employee_categories - Table*/
DROP TABLE IF EXISTS `branch`;
CREATE TABLE `branch`(
	`branch_id` SMALLINT(3) NOT NULL AUTO_INCREMENT,
    `province` VARCHAR(60) NOT NULL,
    `city` VARCHAR(60) NOT NULL,
	`zip_code` VARCHAR(60) NOT NULL,
    `address` VARCHAR(60) NOT NULL,
    `area_number` VARCHAR(60) NULL,
    `phone_number` VARCHAR(30) NULL,
    
    PRIMARY KEY (`branch_id`)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


################## Dumping Data ##################

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;

INSERT INTO `branch` (`branch_id`, `province`, `city`, `zip_code`, `address`,`area_number`, `phone_number`) VALUES  
    (1, "Buenos Aires","Baradero", "2942", "Av. San Martín 9028", 3329, "606503"),
    (2, "Buenos Aires", "San Nicolás", "2900","Ruta 188 Y Ruta 9", null, null),
    (3, "Ciudad Autonoma de Buenos Aires", "Ciudad Autonoma de Buenos Aires","1427", "Tronador 115", null, null),
	(4, "Ciudad Autonoma de Buenos Aires", "Ciudad Autonoma de Buenos Aires","1427", "Donado 943", null, null),
	(5, "Ciudad Autonoma de Buenos Aires", "Ciudad Autonoma de Buenos Aires","1282", "Av. Vélez Sarsfield 566", 11, "32201203"),
	(6, "Ciudad Autonoma de Buenos Aires", "Ciudad Autonoma de Buenos Aires","1292", "Herrera 1995", null, null),
    (7, "Ciudad Autonoma de Buenos Aires", "Ciudad Autonoma de Buenos Aires","1293", "Av. Osvaldo Cruz 1711", 11, "48060904"),
    (8, "Ciudad Autonoma de Buenos Aires", "Ciudad Autonoma de Buenos Aires","1277", "Sta. María del Buen Aire 1001", 11, "60911666"),
    (9, "Buenos Aires", "Avellaneda", "1292", "Ameghino 525", 11, "75110212"),
    (10, "Buenos Aires", "Avellaneda","1871", "French 358", null, null),
    (11, "Buenos Aires", "Pilar", "1629", "Avenida Dardo Rocha 2149", null, null),
    (12, "Buenos Aires", "Vicente López", "1605", "Cap. Justo G. de Bermúdez 4651", null, null),
    (13, "Buenos Aires", "Vicente López", "1609", "Av. Avelino Rolón 1060", null, null),
    (14, "Buenos Aires", "Tigre", "1618", "Mermoz 1179", null, null),
    (15, "Buenos Aires", "Tigre", "1617", "Francia 351", 11, "60098931"),
    (16, "Buenos Aires", "San Antonio de Areco", "2760", "San Antonio de Areco", null, null);
    
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;



	/*employee_categories - Table*/
DROP TABLE IF EXISTS `employee_category`;
CREATE TABLE `employee_category`(
	`category_id` SMALLINT(3) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(40) NOT NULL,
	
    PRIMARY KEY (`category_id`),
    UNIQUE(`name`)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


################## Dumping Data ##################

LOCK TABLES `employee_category` WRITE;
/*!40000 ALTER TABLE `employee_category` DISABLE KEYS */;

INSERT INTO `employee_category` (`category_id`,  `name`) VALUES 
	(1, 'ADMINISTRADOR'),
    (2, 'EVALUADOR');
    
/*!40000 ALTER TABLE `employee_category` ENABLE KEYS */;
UNLOCK TABLES;



	/*employee - Table*/
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee`(
	`employee_id` SMALLINT(3) NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(60) NOT NULL,
    `last_name` VARCHAR(60) NOT NULL,
    `email` VARCHAR(320) NOT NULL,
    `password` VARCHAR(70) NOT NULL,
    `last_login` DATETIME DEFAULT NOW(),
    `category_id` SMALLINT(3) NOT NULL,
    
    
	PRIMARY KEY (`employee_id`),
    UNIQUE(`email`),
    FOREIGN KEY (`category_id`) REFERENCES employee_category(`category_id`) ON UPDATE CASCADE ON DELETE CASCADE
   

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


################## Dumping Data ##################

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;

INSERT INTO `employee` (`employee_id`, `first_name`, `last_name`, `email`, `password`, `last_login`, `category_id`) VALUES  
    (1, "Bautista", "Vicens", "bautivicens@gmail.com", "$2a$12$bpj5L9UoVX2RGRop0ighiuFcIHZadf/5hFj5UvVzwAAQvlOzOCw/K", NOW(), 1),
    (2, "María", "Alegre", "mariaalegre@gmail.com", "$2a$12$bpj5L9UoVX2RGRop0ighiuFcIHZadf/5hFj5UvVzwAAQvlOzOCw/K", NOW(), 2);
    
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;