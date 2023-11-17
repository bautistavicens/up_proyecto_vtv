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
    `area_number` VARCHAR(6) NULL,
    `phone_number` VARCHAR(30) NULL,
    `email` VARCHAR(320) NULL,
    
    PRIMARY KEY (`branch_id`)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


################## Dumping Data ##################

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;

INSERT INTO `branch` (`branch_id`, `province`, `city`, `zip_code`, `address`,`area_number`, `phone_number`, `email`) VALUES  
    (1, "Buenos Aires","Baradero", "2942", "Av. San Martín 9028", 3329, "606503", 'baradero@vtv.gob.ar'),
    (2, "Buenos Aires", "San Nicolás", "2900","Ruta 188 Y Ruta 9", null, null, 'sannicolas@vtv.gob.ar'),
    (3, "Ciudad Autonoma de Buenos Aires", "Ciudad Autonoma de Buenos Aires","1427", "Tronador 115", null, null, 'cabatronador@vtv.gob.ar'),
	(4, "Ciudad Autonoma de Buenos Aires", "Ciudad Autonoma de Buenos Aires","1427", "Donado 943", null, null,'cabadonado@vtv.gob.ar'),
	(5, "Ciudad Autonoma de Buenos Aires", "Ciudad Autonoma de Buenos Aires","1282", "Av. Vélez Sarsfield 566", 11, "32201203", 'cabavelezsarsfield@vtv.gob.ar'),
	(6, "Ciudad Autonoma de Buenos Aires", "Ciudad Autonoma de Buenos Aires","1292", "Herrera 1995", null, null, 'cabaherrera@vtv.gob.ar'),
    (7, "Ciudad Autonoma de Buenos Aires", "Ciudad Autonoma de Buenos Aires","1293", "Av. Osvaldo Cruz 1711", 11, "48060904", 'cabaosvaldocruz@vtv.gob.ar'),
    (8, "Ciudad Autonoma de Buenos Aires", "Ciudad Autonoma de Buenos Aires","1277", "Sta. María del Buen Aire 1001", 11, "60911666", 'cababuenaire@vtv.gob.ar'),
    (9, "Buenos Aires", "Avellaneda", "1292", "Ameghino 525", 11, "75110212", 'avellanedaameghino@vtv.gob.ar'),
    (10, "Buenos Aires", "Avellaneda","1871", "French 358", null, null, 'avellanedafrench@vtv.gob.ar'),
    (11, "Buenos Aires", "Pilar", "1629", "Avenida Dardo Rocha 2149", null, null, 'pilardardorocha@vtv.gob.ar'),
    (12, "Buenos Aires", "Vicente López", "1605", "Cap. Justo G. de Bermúdez 4651", null, null, 'vicentelopezbermudez@vtv.gob.ar'),
    (13, "Buenos Aires", "Vicente López", "1609", "Av. Avelino Rolón 1060", null, null, 'vicentelopezrolon@vtv.gob.ar'),
    (14, "Buenos Aires", "Tigre", "1618", "Mermoz 1179", null, null, 'tigremermoz@vtv.gob.ar'),
    (15, "Buenos Aires", "Tigre", "1617", "Francia 351", 11, "60098931", 'tigrefrancia@vtv.gob.ar'),
    (16, "Buenos Aires", "San Antonio de Areco", "2760", "San Antonio de Areco", null, null,'areco@vtv.gob.ar');
    
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;



	/*status - Table*/
DROP TABLE IF EXISTS `status`;
CREATE TABLE `status`(
	`status_id` SMALLINT(3) NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(40) NOT NULL,
	
    PRIMARY KEY (`status_id`),
    UNIQUE(`description`)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


################## Dumping Data ##################

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;

INSERT INTO `status` (`status_id`,  `description`) VALUES 
	(1, 'LIBRE'),
    (2, 'VENCIDO'),
    (3, 'RESERVADO'),
	(4, 'CANCELADO');
    
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;


	/*appointment - Table*/
DROP TABLE IF EXISTS `appointment`;
CREATE TABLE `appointment`(
	`appointment_id` INT NOT NULL AUTO_INCREMENT,
    `date` DATETIME NOT NULL,
    `status_id` SMALLINT(3) NOT NULL,
	`branch_id` SMALLINT(3) NOT NULL,
    
    PRIMARY KEY (`appointment_id`),
	FOREIGN KEY (`status_id`) REFERENCES status(`status_id`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`branch_id`) REFERENCES branch(`branch_id`) ON UPDATE CASCADE ON DELETE CASCADE
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


################## Dumping Data ##################

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;

INSERT INTO `appointment` (`appointment_id`,  `date`, `status_id`, `branch_id`) VALUES 
	(1, '2023-08-10 10:00:00',1,1),
    (2, '2023-08-10 11:00:00',1,1),
    (3, '2023-08-10 12:00:00',3,1),
    (4, '2023-08-10 13:00:00',1,1),
    (5, '2023-08-10 14:00:00',1,1),
    (6, '2023-08-10 15:00:00',1,1),
    (7, '2023-08-10 16:00:00',1,1),
    (8, '2023-08-10 17:00:00',3,1),

	(9, '2023-08-10 10:00:00',1,2),
    (10, '2023-08-10 11:00:00',1,2),
    (11, '2023-08-10 12:00:00',1,2),
    (12, '2023-08-10 13:00:00',1,2),
    (13, '2023-08-10 14:00:00',1,2),
    (14, '2023-08-10 15:00:00',1,2),
    (15, '2023-08-10 16:00:00',1,2),
    (16, '2023-08-10 17:00:00',3,2),

	(17, '2023-08-10 10:00:00',1,3),
    (18, '2023-08-10 11:00:00',1,3),
    (19, '2023-08-10 12:00:00',1,3),
    (20, '2023-08-10 13:00:00',1,3),
    (21, '2023-08-10 14:00:00',1,3),
    (22, '2023-08-10 15:00:00',1,3),
    (23, '2023-08-10 16:00:00',1,3),
    (24, '2023-08-10 17:00:00',1,3),
	
	(25, '2023-08-10 10:00:00',1,4),
    (26, '2023-08-10 11:00:00',3,4),
    (27, '2023-08-10 12:00:00',1,4),
    (28, '2023-08-10 13:00:00',1,4),
    (29, '2023-08-10 14:00:00',1,4),
    (30, '2023-08-10 15:00:00',1,4),
    (31, '2023-08-10 16:00:00',3,4),
    (32, '2023-08-10 17:00:00',1,4),
    
	(33, '2023-08-10 10:00:00',1,5),
    (34, '2023-08-10 11:00:00',1,5),
    (35, '2023-08-10 12:00:00',1,5),
    (36, '2023-08-10 13:00:00',1,5),
    (37, '2023-08-10 14:00:00',1,5),
    (38, '2023-08-10 15:00:00',1,5),
    (39, '2023-08-10 16:00:00',1,5),
    (40, '2023-08-10 17:00:00',1,5),
    
	(41, '2023-08-10 10:00:00',1,6),
    (42, '2023-08-10 11:00:00',1,6),
    (43, '2023-08-10 12:00:00',1,6),
    (44, '2023-08-10 13:00:00',1,6),
    (45, '2023-08-10 14:00:00',1,6),
    (46, '2023-08-10 15:00:00',1,6),
    (47, '2023-08-10 16:00:00',1,6),
    (48, '2023-08-10 17:00:00',1,6),
    
	(49, '2023-08-10 10:00:00',1,7),
    (50, '2023-08-10 11:00:00',1,7),
    (51, '2023-08-10 12:00:00',1,7),
    (52, '2023-08-10 13:00:00',1,7),
    (53, '2023-08-10 14:00:00',1,7),
    (54, '2023-08-10 15:00:00',1,7),
    (55, '2023-08-10 16:00:00',1,7),
    (56, '2023-08-10 17:00:00',1,7),
    
	(57, '2023-08-10 10:00:00',1,8),
    (58, '2023-08-10 11:00:00',1,8),
    (59, '2023-08-10 12:00:00',1,8),
    (60, '2023-08-10 13:00:00',1,8),
    (61, '2023-08-10 14:00:00',1,8),
    (62, '2023-08-10 15:00:00',1,8),
    (63, '2023-08-10 16:00:00',1,8),
    (64, '2023-08-10 17:00:00',1,8);
    
    
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
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
    FOREIGN KEY (`category_id`) REFERENCES employee_category(`category_id`) ON UPDATE CASCADE ON DELETE NO ACTION
   

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


################## Dumping Data ##################

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;

INSERT INTO `employee` (`employee_id`, `first_name`, `last_name`, `email`, `password`, `last_login`, `category_id`) VALUES  
    (1, "Bautista", "Vicens", "bautivicens@gmail.com", "$2a$12$bpj5L9UoVX2RGRop0ighiuFcIHZadf/5hFj5UvVzwAAQvlOzOCw/K", NOW(), 1),
    (2, "María", "Alegre", "mariaalegre@gmail.com", "$2a$12$bpj5L9UoVX2RGRop0ighiuFcIHZadf/5hFj5UvVzwAAQvlOzOCw/K", NOW(), 2);
    
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;



	/*origin- Table*/
DROP TABLE IF EXISTS `origin`;
CREATE TABLE `origin`(
	`origin_id` SMALLINT(3) NOT NULL,
    `description` VARCHAR(80) NOT NULL,
    
    PRIMARY KEY (`origin_id`)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


################## Dumping Data ##################

LOCK TABLES `origin` WRITE;
/*!40000 ALTER TABLE `origin` DISABLE KEYS */;

INSERT INTO `origin` (`origin_id`,  `description`) VALUES 
	(1, 'Vehículo particular'),
    (2, 'Vehículo empresarial'),
    (3, 'Vehículo de uso exclusivo de personas con discapacidad'),
    (4, 'Vehículo de bomberos'),
    (5, 'Vehículo de uso legislativo'),
    (6, 'Vehículo de uso judicial');
    
/*!40000 ALTER TABLE `origin` ENABLE KEYS */;
UNLOCK TABLES;



	/*vehicle - Table*/
DROP TABLE IF EXISTS `vehicle`;
CREATE TABLE `vehicle`(
	`license_plate` VARCHAR(8) NOT NULL,
    `owner_first_name` VARCHAR(60) NOT NULL,
    `owner_last_name` VARCHAR(60) NOT NULL,
    `owner_dni` VARCHAR(12) NOT NULL,
	`origin_id` SMALLINT(3),
	`appointment_id` INT DEFAULT NULL,
    
    PRIMARY KEY (`license_plate`),
    UNIQUE(`license_plate`),
    FOREIGN KEY (`origin_id`) REFERENCES origin(`origin_id`) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (`appointment_id`) REFERENCES appointment(`appointment_id`) ON UPDATE CASCADE ON DELETE CASCADE
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


################## Dumping Data ##################

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;

INSERT INTO `vehicle` (`license_plate`,  `owner_first_name`, `owner_last_name`, `owner_dni`, `origin_id`, `appointment_id`) VALUES 
	('AA128CZ', 'Juan', 'Gómez', '18189873', 1, 3),
    ('AA481BX', 'Sofía', 'Suárez', '10545254', 1, 8),
    ('AC891CX', 'Javier', 'González', '25671021', 1, 26),
    ('AD269CY', 'Ruth', 'Sczatzer', '26448125', 1,31),
    ('AE089FD', 'Juan', 'Carlos', '18189873', 1, 16);
    
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;



	/*test - Table*/
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test`(
	`test_id` SMALLINT(3) NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(80) NOT NULL,
	
    PRIMARY KEY (`test_id`)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


################## Dumping Data ##################

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;

INSERT INTO `test` (`test_id`,  `description`) VALUES 
	(1, 'Emisión de gases'),
    (2, 'Emisión de ruidos'),
    (3, 'Sistema de dirección'),
    (4, 'Tren delantero'),
    (5, 'Frenos'),
    (6, 'Suspensión'),
    (7, 'Chasis'),
    (8, 'Neumáticos'),
    (9, 'Llantas'),
    (10, 'Luces'),
    (11, 'Seguridad'),
    (12, 'Elementos de emergencia');
    
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;



	/*evaluation - Table*/
DROP TABLE IF EXISTS `evaluation`;
CREATE TABLE `evaluation`(
	`license_plate` VARCHAR(8) NOT NULL,
    `test_id` SMALLINT(3) NOT NULL,
	`score` SMALLINT(3) NOT NULL,
    `date` DATETIME DEFAULT NOW(),
    `employee_id` SMALLINT(3),
    `branch_id`SMALLINT(3) NOT NULL,
    
	PRIMARY KEY (`license_plate`, `test_id`),
	FOREIGN KEY (`license_plate`) REFERENCES vehicle(`license_plate`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`test_id`) REFERENCES test(`test_id`) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (`employee_id`) REFERENCES employee(`employee_id`) ON UPDATE CASCADE ON DELETE SET NULL,
	FOREIGN KEY (`branch_id`) REFERENCES branch(`branch_id`) ON UPDATE CASCADE ON DELETE CASCADE
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


################## Dumping Data ##################

LOCK TABLES `evaluation` WRITE;
/*!40000 ALTER TABLE `evaluation` DISABLE KEYS */;

INSERT INTO `evaluation` (`license_plate`,  `test_id`, `score`, `employee_id`, `branch_id`) VALUES 
	("AC189CZ", 1, 10, 2, 3);
    
/*!40000 ALTER TABLE `evaluation` ENABLE KEYS */;
UNLOCK TABLES;