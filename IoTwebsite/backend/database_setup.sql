-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: iotwebsite
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `iotwebsite`
--

USE `st67050066_iot_website`;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` varchar(100) NOT NULL,
  `curriculum_year_id` int NOT NULL,
  `name_en` varchar(500) NOT NULL,
  `col` int NOT NULL COMMENT 'Semester column 1-8',
  `row_pos` int NOT NULL COMMENT 'Grid row position',
  `row_span` int DEFAULT '1',
  `connects_to` json DEFAULT NULL COMMENT 'Array of course IDs this course connects to',
  `class_name` varchar(100) DEFAULT '',
  `mobile_col` int DEFAULT NULL,
  `mobile_row` int DEFAULT NULL,
  `mobile_col_span` int DEFAULT '1',
  `mobile_row_span` int DEFAULT '1',
  `mobile_connect_from_side` varchar(10) DEFAULT NULL,
  `mobile_connect_to_side` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`,`curriculum_year_id`),
  KEY `curriculum_year_id` (`curriculum_year_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`curriculum_year_id`) REFERENCES `curriculum_years` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES ('ai',1,'Artificial Intelligence',5,2,1,'[]','',2,1,1,1,NULL,NULL),('ai',2,'Artificial Intelligence',5,2,1,'[]','',2,1,1,1,NULL,NULL),('appsoft',1,'App Software for Business',1,7,1,'[]','',1,1,1,1,NULL,NULL),('appsoft',2,'App Software for Business',1,7,1,'[]','',1,1,1,1,NULL,NULL),('cal1',1,'Calculus 1',1,1,1,'[\"cal2\"]','',1,2,1,1,NULL,NULL),('cal1',2,'Calculus 1',1,1,1,'[\"cal2\"]','',1,2,1,1,NULL,NULL),('cal2',1,'Calculus 2',2,1,1,'[\"ode\", \"stat\"]','',1,1,1,1,NULL,NULL),('cal2',2,'Calculus 2',2,1,1,'[\"ode\", \"stat\"]','',1,1,1,1,NULL,NULL),('charm',1,'Charm School',2,7,1,'[]','',4,2,1,1,NULL,NULL),('charm',2,'Charm School',2,7,1,'[]','',4,2,1,1,NULL,NULL),('circuit',1,'Circuit and Electronics',1,4,1,'[\"digi\"]','',2,1,1,1,NULL,NULL),('circuit',2,'Circuit and Electronics',1,4,1,'[\"digi\"]','',2,1,1,1,NULL,NULL),('comm',1,'Principles of Communicate',3,4,1,'[\"iotcomm\"]','',6,1,1,2,NULL,NULL),('comm',2,'Principles of Communicate',3,4,1,'[]','',6,1,1,2,NULL,NULL),('comprog',1,'Computer Program',1,6,1,'[\"oop\"]','',2,2,1,1,NULL,NULL),('comprog',2,'Computer Program',1,6,1,'[\"oop\"]','',2,2,1,1,NULL,NULL),('coop',1,'Co-Operative / Study Abroad',7,6,3,'[]','course-pill-coop',5,1,2,2,NULL,NULL),('coop',2,'Co-Operative / Study Abroad',7,6,3,'[]','course-pill-coop',5,1,2,2,NULL,NULL),('cyber',1,'CPS & Sensors',3,5,1,'[]','',3,2,1,1,NULL,NULL),('cyber',2,'CPS & Sensors',3,5,1,'[]','',3,2,1,1,NULL,NULL),('digi',1,'Fundamental Digital System',2,4,1,'[\"micro\"]','',3,1,1,1,NULL,NULL),('digi',2,'Fundamental Digital System',2,4,1,'[\"micro\"]','',3,1,1,1,NULL,NULL),('digicit',1,'Digital Citizen',3,7,1,'[]','',4,2,1,1,NULL,NULL),('digicit',2,'Digital Citizen',3,7,1,'[]','',4,2,1,1,NULL,NULL),('disc',1,'Discrete Mathematics',4,1,1,'[\"mathds\"]','',1,1,1,2,NULL,NULL),('disc',2,'Discrete Mathematics',4,1,1,'[]','',1,1,1,2,NULL,NULL),('em',1,'Electromagnetic Fields',3,3,1,'[]','',5,1,1,2,NULL,NULL),('em',2,'Electromagnetic Fields',3,3,1,'[]','',5,1,1,2,NULL,NULL),('eng1',1,'Foundation English 1',1,8,1,'[\"eng2\"]','',5,1,1,1,'left',NULL),('eng1',2,'Foundation English 1',1,8,1,'[\"eng2\"]','',5,1,1,1,'left',NULL),('eng2',1,'Foundation English 2',2,8,1,'[]','',4,1,1,1,NULL,NULL),('eng2',2,'Foundation English 2',2,8,1,'[]','',4,1,1,1,NULL,NULL),('free1',1,'Free Elective 1',7,4,1,'[]','course-pill-outline',1,2,2,1,NULL,NULL),('free1',2,'Free Elective 1',7,4,1,'[]','course-pill-outline',1,2,2,1,NULL,NULL),('free2',1,'Free Elective 2',8,3,1,'[]','',3,1,1,1,NULL,NULL),('free2',2,'Free Elective 2',8,3,1,'[]','',3,1,1,1,NULL,NULL),('gen1',1,'Gen Physics 1',1,2,1,'[\"gen2\"]','',5,2,1,1,NULL,NULL),('gen1',2,'Gen Physics 1',1,2,1,'[\"gen2\"]','',5,2,1,1,NULL,NULL),('gen2',1,'Gen Physics 2',2,2,1,'[\"em\"]','',5,1,1,1,NULL,NULL),('gen2',2,'Gen Physics 2',2,2,1,'[]','',5,1,1,1,NULL,NULL),('gened1',1,'Gen-Ed',4,6,1,'[]','',2,2,1,1,NULL,NULL),('gened1',2,'Gen-Ed',4,6,1,'[]','',2,2,1,1,NULL,NULL),('gened2',1,'Gen-Ed',5,7,1,'[]','',1,2,1,1,NULL,NULL),('gened2',2,'Gen-Ed',5,7,1,'[]','',1,2,1,1,NULL,NULL),('gened3',1,'Gen-Ed',6,4,1,'[]','',5,1,1,1,NULL,NULL),('gened3',2,'Gen-Ed',6,4,1,'[]','',5,1,1,1,NULL,NULL),('genedlang1',1,'Gen-Ed (LANG)',4,7,1,'[]','',3,2,1,1,NULL,NULL),('genedlang1',2,'Gen-Ed (LANG)',4,7,1,'[]','',3,2,1,1,NULL,NULL),('gplab1',1,'Gen Physics Lab 1',1,3,1,'[\"gplab2\"]','',6,2,1,1,NULL,NULL),('gplab1',2,'Gen Physics Lab 1',1,3,1,'[\"gplab2\"]','',6,2,1,1,NULL,NULL),('gplab2',1,'General Physics Lab 2',2,3,1,'[\"em\"]','',6,1,1,1,NULL,NULL),('gplab2',2,'General Physics Lab 2',2,3,1,'[]','',6,1,1,1,NULL,NULL),('iiot',1,'Industrial Internet of Things',6,1,1,'[]','',1,1,1,1,NULL,NULL),('iiot',2,'Industrial Internet of Things',6,1,1,'[]','',1,1,1,1,NULL,NULL),('inter',1,'Interaction Design',4,2,1,'[]','',2,1,1,1,NULL,NULL),('inter',2,'Interaction Design',4,2,1,'[]','',2,1,1,1,NULL,NULL),('intro_iot',1,'Introduction to IoT',1,5,1,'[\"oop\"]','',6,1,1,1,NULL,NULL),('intro_iot',2,'Introduction to IoT',1,5,1,'[\"oop\"]','',6,1,1,1,NULL,NULL),('iotcomm',1,'IoT and Data Communicate',4,5,1,'[]','',6,1,1,1,NULL,NULL),('iotcomm',2,'IoT and Data Communicate',4,5,1,'[]','',6,1,1,1,NULL,NULL),('iotele1',1,'IoT Elective 1',7,2,1,'[]','course-pill-outline',3,1,2,1,NULL,NULL),('iotele1',2,'IoT Elective 1',7,2,1,'[]','course-pill-outline',3,1,2,1,NULL,NULL),('iotele2',1,'IoT Elective 2',7,3,1,'[]','course-pill-outline',3,2,2,1,NULL,NULL),('iotele2',2,'IoT Elective 2',7,3,1,'[]','course-pill-outline',3,2,2,1,NULL,NULL),('iotele3',1,'IoT Elective 3',8,2,1,'[]','',2,1,1,1,NULL,NULL),('iotele3',2,'IoT Elective 3',8,2,1,'[]','',2,1,1,1,NULL,NULL),('iotlab1',1,'IoT & Info Lab 1',5,6,1,'[]','',6,1,1,1,NULL,NULL),('iotlab1',2,'IoT & Info Lab 1',5,6,1,'[]','',6,1,1,1,NULL,NULL),('iotlab2',1,'IoT & Info Lab 2',6,3,1,'[]','',3,1,1,1,NULL,NULL),('iotlab2',2,'IoT & Info Lab 2',6,3,1,'[]','',3,1,1,1,NULL,NULL),('major1',1,'MAJOR ELECTIVE 1',5,3,1,'[]','',3,1,1,1,NULL,NULL),('major1',2,'MAJOR ELECTIVE 1',5,3,1,'[]','',3,1,1,1,NULL,NULL),('major2',1,'MAJOR ELECTIVE 2',5,4,1,'[]','',4,1,1,1,NULL,NULL),('major2',2,'MAJOR ELECTIVE 2',5,4,1,'[]','',4,1,1,1,NULL,NULL),('major3',1,'MAJOR ELECTIVE 3',6,2,1,'[]','',2,1,1,1,NULL,NULL),('major3',2,'MAJOR ELECTIVE 3',6,2,1,'[]','',2,1,1,1,NULL,NULL),('mathds',1,'Math Data Science',5,1,1,'[]','',1,1,1,1,NULL,NULL),('mathds',2,'Math Data Science',5,1,1,'[]','',1,1,1,1,NULL,NULL),('micro',1,'MCU and Embedded',3,6,1,'[]','',3,1,2,1,NULL,NULL),('micro',2,'MCU and Embedded',3,6,1,'[\"cyber\"]','',3,1,2,1,NULL,NULL),('ode',1,'ODE and Linear Algebra',3,1,1,'[\"disc\"]','',1,1,1,2,NULL,NULL),('ode',2,'ODE and Linear Algebra',3,1,1,'[]','',1,1,1,2,NULL,NULL),('oop',1,'Object-Oriented Data Structure',2,5,1,'[]','',2,1,1,1,NULL,NULL),('oop',2,'Object-Oriented Data Structure',2,5,1,'[]','',2,1,1,1,NULL,NULL),('preact',1,'Pre-Activities For Engineers',2,6,1,'[]','',2,2,1,1,NULL,NULL),('preact',2,'Pre-Activities For Engineers',2,6,1,'[]','',2,2,1,1,NULL,NULL),('proj1',1,'Project 1',7,1,1,'[\"proj2_1\"]','course-pill-outline',1,1,2,1,NULL,NULL),('proj1',2,'Project 1',7,1,1,'[\"proj2_1\"]','course-pill-outline',1,1,2,1,NULL,NULL),('proj2_1',1,'Project 2',8,1,1,'[]','',1,1,1,1,NULL,NULL),('proj2_1',2,'Project 2',8,1,1,'[]','',1,1,1,1,NULL,NULL),('proj2_2',1,'Project 2',8,6,1,'[]','',1,1,1,1,NULL,NULL),('proj2_2',2,'Project 2',8,6,1,'[]','',1,1,1,1,NULL,NULL),('proj2_3',1,'Project 2',8,7,1,'[]','',2,1,1,1,NULL,NULL),('proj2_3',2,'Project 2',8,7,1,'[]','',2,1,1,1,NULL,NULL),('proj2_4',1,'Project 2',8,8,1,'[]','',3,1,1,1,NULL,NULL),('proj2_4',2,'Project 2',8,8,1,'[]','',3,1,1,1,NULL,NULL),('proj2_5',1,'Project 2',8,9,1,'[]','',4,1,1,1,NULL,NULL),('proj2_5',2,'Project 2',8,9,1,'[]','',4,1,1,1,NULL,NULL),('proj2_6',1,'Project 2',8,10,1,'[]','',5,1,1,1,NULL,NULL),('proj2_6',2,'Project 2',8,10,1,'[]','',5,1,1,1,NULL,NULL),('sec',1,'Cyber Security',4,4,1,'[]','',5,1,1,1,NULL,NULL),('sec',2,'Cyber Security',4,4,1,'[]','',5,1,1,1,NULL,NULL),('sem',1,'SEMINAR',5,5,1,'[]','',5,1,1,1,NULL,NULL),('sem',2,'SEMINAR',5,5,1,'[]','',5,1,1,1,NULL,NULL),('stat',1,'Engineering Statistics',3,2,1,'[]','',2,1,1,2,NULL,NULL),('stat',2,'Engineering Statistics',3,2,1,'[]','',2,1,1,2,NULL,NULL),('team1',1,'Team Project 1',2,9,1,'[]','',6,2,1,1,NULL,NULL),('team1',2,'Team Project 1',2,9,1,'[\"team2\"]','',6,2,1,1,NULL,NULL),('team2',1,'Team Project 2',4,9,1,'[]','',4,1,1,1,NULL,NULL),('team2',2,'Team Project 2',4,9,1,'[\"team3\"]','',4,1,1,1,NULL,NULL),('team3',1,'Team Project 3',6,9,1,'[]','',4,1,1,1,NULL,NULL),('team3',2,'Team Project 3',6,9,1,'[]','',4,1,1,1,NULL,NULL),('web',1,'Web and Mobile App Development',4,3,1,'[]','',3,1,1,1,NULL,NULL),('web',2,'Web and Mobile App Development',4,3,1,'[]','',3,1,1,1,NULL,NULL);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curriculum_continue`
--

DROP TABLE IF EXISTS `curriculum_continue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curriculum_continue` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `curriculum_year` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `col` int NOT NULL,
  `row` int NOT NULL,
  `row_span` int DEFAULT NULL,
  `class_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_col` int DEFAULT NULL,
  `mobile_row` int DEFAULT NULL,
  `mobile_col_span` int DEFAULT NULL,
  `mobile_row_span` int DEFAULT NULL,
  `plan_group` tinyint DEFAULT NULL,
  `plan_label` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`,`curriculum_year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curriculum_continue`
--

LOCK TABLES `curriculum_continue` WRITE;
/*!40000 ALTER TABLE `curriculum_continue` DISABLE KEYS */;
INSERT INTO `curriculum_continue` VALUES ('01006012','2569','Computer Programming',NULL,1,3,NULL,NULL,1,3,NULL,NULL,NULL,NULL),('01446001','2569','Calculus for Computer Engineering',NULL,1,1,NULL,NULL,1,1,NULL,NULL,NULL,NULL),('01446002','2569','Computer Engineering Mathematics',NULL,2,1,NULL,NULL,2,1,NULL,NULL,NULL,NULL),('01446003','2569','Probability and Statistics',NULL,2,4,NULL,NULL,2,4,NULL,NULL,NULL,NULL),('01446004','2569','Digital System Design',NULL,1,5,NULL,NULL,1,5,NULL,NULL,NULL,NULL),('01446005','2569','Circuit and Electronics',NULL,1,4,NULL,NULL,1,4,NULL,NULL,NULL,NULL),('01446006','2569','Electronics and Digital System Laboratory',NULL,1,6,NULL,NULL,1,6,NULL,NULL,NULL,NULL),('01446007','2569','Introduction to Internet of Things',NULL,1,2,NULL,NULL,1,2,NULL,NULL,NULL,NULL),('01446008','2569','Microcontroller and Embedded Systems',NULL,3,5,NULL,NULL,3,5,NULL,NULL,NULL,NULL),('01446009','2569','Object-Oriented Programming',NULL,2,2,NULL,NULL,2,2,NULL,NULL,NULL,NULL),('01446010','2569','Data Structure and Algorithm',NULL,3,3,NULL,NULL,3,3,NULL,NULL,NULL,NULL),('01446011','2569','Database System',NULL,4,2,NULL,NULL,4,2,NULL,NULL,NULL,NULL),('01446012','2569','Data Communications and Computer Networks',NULL,3,4,NULL,NULL,3,4,NULL,NULL,NULL,NULL),('01446013','2569','Internetworking Design and Practice',NULL,5,3,NULL,NULL,5,3,NULL,NULL,NULL,NULL),('01446014','2569','Web and Mobile Application Development',NULL,4,5,NULL,NULL,4,5,NULL,NULL,NULL,NULL),('01446015','2569','Interaction Design',NULL,2,7,NULL,NULL,2,7,NULL,NULL,NULL,NULL),('01446016','2569','PLC and Industrial Internet of Things',NULL,4,4,NULL,NULL,4,3,NULL,NULL,NULL,NULL),('01446017','2569','Artificial Intelligence of Things',NULL,5,2,NULL,NULL,5,2,NULL,NULL,NULL,NULL),('01446018','2569','Cyber Security Systems',NULL,4,3,NULL,NULL,4,3,NULL,NULL,NULL,NULL),('01446019','2569','Sensor and Cyber-Physical System',NULL,3,8,NULL,NULL,3,8,NULL,NULL,NULL,NULL),('01446020','2569','Computer and IoT Engineering Laboratory 1',NULL,3,6,NULL,NULL,3,6,NULL,NULL,NULL,NULL),('01446021','2569','Computer and IoT Engineering Laboratory 2',NULL,4,6,NULL,NULL,4,6,NULL,NULL,NULL,NULL),('01446022','2569','Computer Architecture and Operating Systems',NULL,2,5,NULL,NULL,2,5,NULL,NULL,NULL,NULL),('01446023','2569','Cloud Operations in Practices',NULL,3,7,NULL,NULL,3,7,NULL,NULL,NULL,NULL),('01446024','2569','System Analysis and Design',NULL,3,2,NULL,NULL,3,2,NULL,NULL,NULL,NULL),('01446025','2569','Principle of Communication Systems',NULL,2,3,NULL,NULL,2,3,NULL,NULL,NULL,NULL),('01446076','2569','Project 1',NULL,5,1,NULL,NULL,5,1,NULL,NULL,NULL,NULL),('01446077','2569','Project 2',NULL,6,2,NULL,NULL,6,2,NULL,NULL,NULL,NULL),('90641004','2569','Team-Project 1',NULL,2,8,NULL,NULL,2,8,NULL,NULL,NULL,NULL),('90641005','2569','Team Project 2',NULL,4,7,NULL,NULL,4,7,NULL,NULL,NULL,NULL),('90641006','2569','Team-Project 3',NULL,6,1,NULL,NULL,6,1,NULL,NULL,NULL,NULL),('90641007','2569','Digital Citizen',NULL,1,9,NULL,NULL,1,9,NULL,NULL,NULL,NULL),('90641008','2569','Introduction to English Communication Skills',NULL,1,8,NULL,NULL,1,8,NULL,NULL,NULL,NULL),('90641009','2569','Intercultural Communication Skills in English 1',NULL,3,1,NULL,NULL,3,1,NULL,NULL,NULL,NULL),('90641010','2569','Intercultural Communication Skills in English 2',NULL,4,1,NULL,NULL,4,1,NULL,NULL,NULL,NULL),('90642036','2569','Pre-Activities For Engineers',NULL,2,6,NULL,NULL,2,6,NULL,NULL,NULL,NULL),('90642118','2569','Application Software for Business',NULL,1,7,NULL,NULL,1,7,NULL,NULL,NULL,NULL),('ELEC_01','2569','Elective 1',NULL,5,4,NULL,NULL,5,4,NULL,NULL,NULL,NULL),('ELEC_02','2569','Elective 2',NULL,5,6,NULL,NULL,5,6,NULL,NULL,NULL,NULL),('ELEC_03','2569','Elective 3',NULL,6,3,NULL,NULL,6,3,NULL,NULL,NULL,NULL),('ELEC_04','2569','Elective 4',NULL,6,6,NULL,NULL,6,6,NULL,NULL,NULL,NULL),('FREE_01','2569','Free Elective 1',NULL,5,5,NULL,NULL,5,5,NULL,NULL,NULL,NULL),('FREE_02','2569','Free Elective 2',NULL,6,5,NULL,NULL,6,5,NULL,NULL,NULL,NULL),('GEN_ED_1','2569','General Education',NULL,6,4,NULL,NULL,6,4,NULL,NULL,NULL,NULL),('GEN_ELEC_1','2569','General Education Elective',NULL,4,8,NULL,NULL,4,8,NULL,NULL,NULL,NULL),('GEN_LANG','2569','General Education Elective (Language)',NULL,5,7,NULL,NULL,5,7,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `curriculum_continue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curriculum_iot`
--

DROP TABLE IF EXISTS `curriculum_iot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curriculum_iot` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `curriculum_year` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `col` int NOT NULL,
  `row` int NOT NULL,
  `row_span` int DEFAULT NULL,
  `class_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_col` int DEFAULT NULL,
  `mobile_row` int DEFAULT NULL,
  `mobile_col_span` int DEFAULT NULL,
  `mobile_row_span` int DEFAULT NULL,
  `plan_group` tinyint DEFAULT NULL,
  `plan_label` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`,`curriculum_year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curriculum_iot`
--

LOCK TABLES `curriculum_iot` WRITE;
/*!40000 ALTER TABLE `curriculum_iot` DISABLE KEYS */;
INSERT INTO `curriculum_iot` VALUES ('ai','2565','Artificial Intelligence',NULL,5,2,NULL,NULL,2,1,NULL,NULL,NULL,NULL),('appsoft','2565','App Software for Business','Learn fundamental application software used in modern business environments.',1,1,NULL,NULL,1,1,NULL,NULL,NULL,NULL),('cal1','2565','Calculus 1',NULL,1,5,NULL,NULL,1,2,NULL,NULL,NULL,NULL),('cal2','2565','Calculus 2',NULL,2,1,NULL,NULL,1,1,NULL,NULL,NULL,NULL),('charm','2565','Charm School',NULL,2,8,NULL,NULL,4,2,NULL,NULL,NULL,NULL),('circuit','2565','Circuit and Electronics','Introduction to basic circuit theory.',1,2,NULL,NULL,2,1,NULL,NULL,NULL,NULL),('comm','2565','Principles of Communicate',NULL,3,7,NULL,NULL,6,1,NULL,NULL,NULL,NULL),('comprog','2565','Computer Program',NULL,1,6,NULL,NULL,2,2,NULL,NULL,NULL,NULL),('coop','2565','Co-Operative / Study Abroad',NULL,7,6,3,'course-pill-coop',5,1,2,2,2,'PLAN 2\nCo-op'),('cyber','2565','CPS & Sensors',NULL,3,4,NULL,NULL,3,2,NULL,NULL,NULL,NULL),('digi','2565','Fundamental Digital System',NULL,2,3,NULL,NULL,3,1,NULL,NULL,NULL,NULL),('digicit','2565','Digital Citizen',NULL,3,5,NULL,NULL,4,2,NULL,NULL,NULL,NULL),('disc','2565','Discrete Mathematics',NULL,4,1,NULL,NULL,1,1,NULL,NULL,NULL,NULL),('em','2565','Electromagnetic Fields',NULL,3,6,NULL,NULL,5,1,NULL,NULL,NULL,NULL),('eng1','2565','Foundation English 1','Developing essential communicative English skills.',1,3,NULL,NULL,5,1,NULL,NULL,NULL,NULL),('eng2','2565','Foundation English 2',NULL,2,4,NULL,NULL,4,1,NULL,NULL,NULL,NULL),('free1','2565','Free Elective 1',NULL,7,3,NULL,'course-pill-outline',1,2,2,NULL,1,'PLAN 1\nproject'),('free2','2565','Free Elective 2',NULL,8,3,NULL,NULL,3,1,NULL,NULL,1,'PLAN 1\nproject'),('gen1','2565','Gen Physics 1',NULL,1,7,NULL,NULL,5,2,NULL,NULL,NULL,NULL),('gen2','2565','Gen Physics 2',NULL,2,5,NULL,NULL,5,1,NULL,NULL,NULL,NULL),('gened1','2565','Gen-Ed',NULL,4,7,NULL,NULL,2,2,NULL,NULL,NULL,NULL),('gened2','2565','Gen-Ed',NULL,5,7,NULL,NULL,1,2,NULL,NULL,NULL,NULL),('gened3','2565','Gen-Ed',NULL,6,5,NULL,NULL,5,1,NULL,NULL,NULL,NULL),('genedlang1','2565','Gen-Ed (LANG)',NULL,4,8,NULL,NULL,3,2,NULL,NULL,NULL,NULL),('gplab1','2565','Gen Physics Lab 1',NULL,1,8,NULL,NULL,6,2,NULL,NULL,NULL,NULL),('gplab2','2565','General Physics Lab 2',NULL,2,6,NULL,NULL,6,1,NULL,NULL,NULL,NULL),('iiot','2565','Industrial Internet of Things',NULL,6,1,NULL,NULL,1,1,NULL,NULL,NULL,NULL),('inter','2565','Interaction Design',NULL,4,2,NULL,NULL,2,1,NULL,NULL,NULL,NULL),('intro_iot','2565','Introduction to IoT','A comprehensive overview of the IoT ecosystem.',1,4,NULL,NULL,6,1,NULL,NULL,NULL,NULL),('iot68-1','2568','App Software for Business',NULL,1,1,NULL,NULL,1,1,NULL,NULL,NULL,NULL),('iot69-1','2569','Introduction to IoT Engineering',NULL,1,1,NULL,NULL,1,1,NULL,NULL,NULL,NULL),('iotcomm','2565','IoT and Data Communicate',NULL,4,6,NULL,NULL,6,1,NULL,NULL,NULL,NULL),('iotele1','2565','IoT Elective 1',NULL,7,2,NULL,'course-pill-outline',3,1,2,NULL,1,'PLAN 1\nproject'),('iotele2','2565','IoT Elective 2',NULL,7,4,NULL,'course-pill-outline',3,2,2,NULL,1,'PLAN 1\nproject'),('iotele3','2565','IoT Elective 3',NULL,8,2,NULL,NULL,2,1,NULL,NULL,1,'PLAN 1\nproject'),('iotlab1','2565','IoT & Info Lab 1',NULL,5,6,NULL,NULL,6,1,NULL,NULL,NULL,NULL),('iotlab2','2565','IoT & Info Lab 2',NULL,6,3,NULL,NULL,3,1,NULL,NULL,NULL,NULL),('major1','2565','MAJOR ELECTIVE 1',NULL,5,3,NULL,NULL,3,1,NULL,NULL,NULL,NULL),('major2','2565','MAJOR ELECTIVE 2',NULL,5,4,NULL,NULL,4,1,NULL,NULL,NULL,NULL),('major3','2565','MAJOR ELECTIVE 3',NULL,6,2,NULL,NULL,2,1,NULL,NULL,NULL,NULL),('mathds','2565','Math Data Science',NULL,5,1,NULL,NULL,1,1,NULL,NULL,NULL,NULL),('micro','2565','MCU and Embedded',NULL,3,3,NULL,NULL,3,1,NULL,NULL,NULL,NULL),('ode','2565','ODE and Linear Algebra',NULL,3,1,NULL,NULL,1,1,NULL,NULL,NULL,NULL),('oop','2565','Object-Oriented Data Structure',NULL,2,2,NULL,NULL,2,1,NULL,NULL,NULL,NULL),('preact','2565','Pre-Activities For Engineers',NULL,2,7,NULL,NULL,2,2,NULL,NULL,NULL,NULL),('proj1','2565','Project 1',NULL,7,1,NULL,'course-pill-outline',1,1,2,NULL,1,'PLAN 1\nproject'),('proj2_1','2565','Project 2',NULL,8,1,NULL,NULL,1,1,NULL,NULL,1,'PLAN 1\nproject'),('proj2_2','2565','Project 2',NULL,8,6,NULL,NULL,1,1,NULL,NULL,2,'PLAN 2\nCo-op'),('proj2_3','2565','Project 2',NULL,8,7,NULL,NULL,2,1,NULL,NULL,2,'PLAN 2\nCo-op'),('proj2_4','2565','Project 2',NULL,8,8,NULL,NULL,3,1,NULL,NULL,2,'PLAN 2\nCo-op'),('proj2_5','2565','Project 2',NULL,8,9,NULL,NULL,4,1,NULL,NULL,2,'PLAN 2\nCo-op'),('proj2_6','2565','Project 2',NULL,8,10,NULL,NULL,5,1,NULL,NULL,2,'PLAN 2\nCo-op'),('sec','2565','Cyber Security',NULL,4,5,NULL,NULL,5,1,NULL,NULL,NULL,NULL),('sem','2565','SEMINAR',NULL,5,5,NULL,NULL,5,1,NULL,NULL,NULL,NULL),('stat','2565','Engineering Statistics',NULL,3,2,NULL,NULL,2,1,NULL,NULL,NULL,NULL),('team1','2565','Team Project 1',NULL,2,9,NULL,NULL,6,2,NULL,NULL,NULL,NULL),('team2','2565','Team Project 2',NULL,4,4,NULL,NULL,4,1,NULL,NULL,NULL,NULL),('team3','2565','Team Project 3',NULL,6,4,NULL,NULL,4,1,NULL,NULL,NULL,NULL),('web','2565','Web and Mobile App Development',NULL,4,3,NULL,NULL,3,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `curriculum_iot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curriculum_metadata`
--

DROP TABLE IF EXISTS `curriculum_metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curriculum_metadata` (
  `program` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `curriculum_year` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pdf_url` text COLLATE utf8mb4_unicode_ci,
  `pdf_label` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`program`,`curriculum_year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curriculum_metadata`
--

LOCK TABLES `curriculum_metadata` WRITE;
/*!40000 ALTER TABLE `curriculum_metadata` DISABLE KEYS */;
INSERT INTO `curriculum_metadata` VALUES ('continue','2565','https://drive.google.com/file/d/1U8mm7DxtNpFDbuWFgt22wRNEKulB_OU3/view','เล่มหลักสูตรวิศวกรรมคอมพิวเตอร์และไอโอที (ต่อเนื่อง) 2565'),('continue','2568','https://drive.google.com/file/d/1U8mm7DxtNpFDbuWFgt22wRNEKulB_OU3/view','เล่มหลักสูตรวิศวกรรมคอมพิวเตอร์และไอโอที (ต่อเนื่อง) 2568'),('continue','2569','https://drive.google.com/file/d/1U8mm7DxtNpFDbuWFgt22wRNEKulB_OU3/view','เล่มหลักสูตรวิศวกรรมคอมพิวเตอร์และไอโอที (ต่อเนื่อง) 2569'),('iot','2565','https://drive.google.com/file/d/1U8mm7DxtNpFDbuWFgt22wRNEKulB_OU3/view','เล่มหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ 2565'),('iot','2568','https://drive.google.com/file/d/1U8mm7DxtNpFDbuWFgt22wRNEKulB_OU3/view','เล่มหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ 2568'),('iot','2569','https://drive.google.com/file/d/1U8mm7DxtNpFDbuWFgt22wRNEKulB_OU3/view','เล่มหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ 2569'),('iot','2590','https://drive.google.com/file/d/1U8mm7DxtNpFDbuWFgt22wRNEKulB_OU3/view','เล่มหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ 2568'),('physiot','2565','https://drive.google.com/file/d/1cHSWjO3A03lcGqgbT9PR51d335LfaVVo/view','เล่มหลักสูตรฟิสิกส์อุตสาหกรรม วิศวกรรมระบบไอโอที 2565'),('physiot','2568','https://drive.google.com/file/d/1cHSWjO3A03lcGqgbT9PR51d335LfaVVo/view','เล่มหลักสูตรฟิสิกส์อุตสาหกรรม วิศวกรรมระบบไอโอที 2568'),('physiot','2569','https://drive.google.com/file/d/1cHSWjO3A03lcGqgbT9PR51d335LfaVVo/view','เล่มหลักสูตรฟิสิกส์อุตสาหกรรม วิศวกรรมระบบไอโอที 2569');
/*!40000 ALTER TABLE `curriculum_metadata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curriculum_physiot`
--

DROP TABLE IF EXISTS `curriculum_physiot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curriculum_physiot` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `curriculum_year` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `col` int NOT NULL,
  `row` int NOT NULL,
  `row_span` int DEFAULT NULL,
  `class_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_col` int DEFAULT NULL,
  `mobile_row` int DEFAULT NULL,
  `mobile_col_span` int DEFAULT NULL,
  `mobile_row_span` int DEFAULT NULL,
  `plan_group` tinyint DEFAULT NULL,
  `plan_label` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`,`curriculum_year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curriculum_physiot`
--

LOCK TABLES `curriculum_physiot` WRITE;
/*!40000 ALTER TABLE `curriculum_physiot` DISABLE KEYS */;
INSERT INTO `curriculum_physiot` VALUES ('01006012','2569','Computer Programming',NULL,1,6,NULL,NULL,1,6,NULL,NULL,NULL,NULL),('01006020','2569','General Physics 1',NULL,1,4,NULL,NULL,1,4,NULL,NULL,NULL,NULL),('01006021','2569','General Physics Laboratory 1',NULL,1,5,NULL,NULL,1,5,NULL,NULL,NULL,NULL),('01006022','2569','General Physics 2',NULL,2,2,NULL,NULL,2,2,NULL,NULL,NULL,NULL),('01006023','2569','General Physics Laboratory 2',NULL,2,3,NULL,NULL,2,3,NULL,NULL,NULL,NULL),('01006029','2569','Co-operative Education / Oversea Training',NULL,7,6,3,'course-pill-coop',7,6,2,2,2,'PLAN 2\nCo-op'),('01006030','2569','Calculus 1',NULL,1,1,NULL,NULL,1,1,NULL,NULL,NULL,NULL),('01006031','2569','Calculus 2',NULL,2,1,NULL,NULL,2,1,NULL,NULL,NULL,NULL),('01236600','2569','Elementary Differential Equation and Linear Algebra',NULL,3,1,NULL,NULL,3,1,NULL,NULL,NULL,NULL),('01236601','2569','Probability and Statistics',NULL,2,4,NULL,NULL,2,4,NULL,NULL,NULL,NULL),('01236602','2569','Discrete Mathematics',NULL,2,9,NULL,NULL,2,9,NULL,NULL,NULL,NULL),('01236603','2569','Fundamental of Digital System Design',NULL,3,2,NULL,NULL,3,2,NULL,NULL,NULL,NULL),('01236604','2569','Circuits and Electronics',NULL,1,9,NULL,NULL,1,9,NULL,NULL,NULL,NULL),('01236605','2569','Circuit and Electronics Laboratory',NULL,1,8,NULL,NULL,1,8,NULL,NULL,NULL,NULL),('01236606','2569','IoT and Information Engineering Project 1',NULL,7,1,NULL,NULL,7,1,NULL,NULL,1,'PLAN 1\nProject'),('01236607','2569','IoT and Information Engineering Project 2',NULL,8,1,NULL,NULL,8,1,NULL,NULL,1,'PLAN 1\nProject'),('01236608','2569','IoT Engineering Capstone Design',NULL,8,4,NULL,NULL,8,4,NULL,NULL,1,'PLAN 1\nProject'),('01236609','2569','Digital System Design Laboratory',NULL,3,3,NULL,NULL,3,3,NULL,NULL,NULL,NULL),('01236610','2569','Engineering 3D Drawing in Practice',NULL,1,7,NULL,NULL,1,7,NULL,NULL,NULL,NULL),('01236611','2569','Introduction to Internet of Things',NULL,1,13,NULL,NULL,1,13,NULL,NULL,NULL,NULL),('01236612','2569','Microcontroller and Embedded Systems',NULL,5,1,NULL,NULL,5,1,NULL,NULL,NULL,NULL),('01236613','2569','Object-Oriented Programming',NULL,2,8,NULL,NULL,2,8,NULL,NULL,NULL,NULL),('01236614','2569','Data Structure and Algorithm',NULL,3,9,NULL,NULL,3,9,NULL,NULL,NULL,NULL),('01236615','2569','Principle of Communications Systems',NULL,3,8,NULL,NULL,3,8,NULL,NULL,NULL,NULL),('01236616','2569','Data Communications and IoT Networks',NULL,4,7,NULL,NULL,4,7,NULL,NULL,NULL,NULL),('01236617','2569','Sensors and Cyber Physical System',NULL,4,3,NULL,NULL,4,3,NULL,NULL,NULL,NULL),('01236618','2569','Web and Mobile Application Development',NULL,4,8,NULL,NULL,4,8,NULL,NULL,NULL,NULL),('01236619','2569','Interaction Design',NULL,2,10,NULL,NULL,2,10,NULL,NULL,NULL,NULL),('01236620','2569','PLC and Industrial Internet of Things',NULL,6,8,NULL,NULL,6,8,NULL,NULL,NULL,NULL),('01236621','2569','Artificial Intelligence of Things',NULL,5,7,NULL,NULL,5,7,NULL,NULL,NULL,NULL),('01236622','2569','Cyber Security Systems',NULL,5,8,NULL,NULL,5,8,NULL,NULL,NULL,NULL),('01236623','2569','IoT and Information Laboratory 1',NULL,5,2,NULL,NULL,5,2,NULL,NULL,NULL,NULL),('01236624','2569','IoT and Information Engineering Laboratory 2',NULL,6,3,NULL,NULL,6,3,NULL,NULL,NULL,NULL),('01236625','2569','Seminar with Professionals',NULL,5,9,NULL,NULL,5,9,NULL,NULL,NULL,NULL),('01236626','2569','System Analysis and Design',NULL,3,10,NULL,NULL,3,10,NULL,NULL,NULL,NULL),('01236627','2569','Computer Architecture and Operating Systems',NULL,4,9,NULL,NULL,4,9,NULL,NULL,NULL,NULL),('01236628','2569','Cloud Operations in Practices',NULL,4,11,NULL,NULL,4,11,NULL,NULL,NULL,NULL),('01236629','2569','Wireless Communication Systems for IoT',NULL,5,10,NULL,NULL,5,10,NULL,NULL,NULL,NULL),('01236630','2569','Database Systems',NULL,4,10,NULL,NULL,4,10,NULL,NULL,NULL,NULL),('05106030','2569','General Chemistry',NULL,1,2,NULL,NULL,1,2,NULL,NULL,NULL,NULL),('05106042','2569','General Chemistry Laboratory',NULL,1,3,NULL,NULL,1,3,NULL,NULL,NULL,NULL),('05366028','2569','Mechanics',NULL,3,4,NULL,NULL,3,4,NULL,NULL,NULL,NULL),('05366029','2569','Quantum Mechanics and Quantum Technology',NULL,6,1,NULL,NULL,6,1,NULL,NULL,NULL,NULL),('05366030','2569','Modern Physics',NULL,4,1,NULL,NULL,4,1,NULL,NULL,NULL,NULL),('05366031','2569','Thermal and Statistics Physics',NULL,5,4,NULL,NULL,5,4,NULL,NULL,NULL,NULL),('05366032','2569','Electromagnetic Field',NULL,4,5,NULL,NULL,4,5,NULL,NULL,NULL,NULL),('05366033','2569','Waves and Optics',NULL,4,2,NULL,NULL,4,2,NULL,NULL,NULL,NULL),('05366037','2569','Measurement and Instrumentation',NULL,6,2,NULL,NULL,6,2,NULL,NULL,NULL,NULL),('05366039','2569','Intermediate Physics Laboratory 1',NULL,3,5,NULL,NULL,3,5,NULL,NULL,NULL,NULL),('05366040','2569','Intermediate Physics Laboratory 2',NULL,4,4,NULL,NULL,4,4,NULL,NULL,NULL,NULL),('05366044','2569','Semiconductor Devices',NULL,5,3,NULL,NULL,5,3,NULL,NULL,NULL,NULL),('05366045','2569','Materials Engineering and Industrial Applications',NULL,5,5,NULL,NULL,5,5,NULL,NULL,NULL,NULL),('05366080','2569','Seminar',NULL,8,3,NULL,NULL,8,3,NULL,NULL,1,'PLAN 1\nProject'),('05366123','2569','Electronic Circuits',NULL,3,6,NULL,NULL,3,6,NULL,NULL,NULL,NULL),('9064_LANG1','2569','General Education (Language and Communication)',NULL,5,6,NULL,NULL,5,6,NULL,NULL,NULL,NULL),('90641004','2569','Team-Project 1',NULL,2,6,NULL,NULL,2,6,NULL,NULL,NULL,NULL),('90641005','2569','Team-Project 2',NULL,4,6,NULL,NULL,4,6,NULL,NULL,NULL,NULL),('90641006','2569','Team-Project 3',NULL,6,6,NULL,NULL,6,6,NULL,NULL,NULL,NULL),('90641007','2569','Digital Citizen',NULL,2,7,NULL,NULL,2,7,NULL,NULL,NULL,NULL),('90641008','2569','KMITL Identity Skills',NULL,1,11,NULL,NULL,1,11,NULL,NULL,NULL,NULL),('90641009','2569','Intercultural Communication Skills in English 1',NULL,3,7,NULL,NULL,3,7,NULL,NULL,NULL,NULL),('90641010','2569','Intercultural Communication Skills in English 2',NULL,6,7,NULL,NULL,6,7,NULL,NULL,NULL,NULL),('90642036','2569','Pre-Activities for Engineers',NULL,1,10,NULL,NULL,1,10,NULL,NULL,NULL,NULL),('90642118','2569','Application Software for Business',NULL,2,5,NULL,NULL,2,5,NULL,NULL,NULL,NULL),('ELEC_01','2569','Elective 1',NULL,6,4,NULL,NULL,6,4,NULL,NULL,NULL,NULL),('ELEC_02','2569','Elective 2',NULL,6,5,NULL,NULL,6,5,NULL,NULL,NULL,NULL),('ELEC_03','2569','Elective 3',NULL,7,5,NULL,NULL,7,5,NULL,NULL,1,'PLAN 1\nProject'),('ENG_INTRO','2569','Introduction to English Communication Skills',NULL,1,12,NULL,NULL,1,12,NULL,NULL,NULL,NULL),('FREE_01','2569','Free Elective 1',NULL,7,2,NULL,NULL,7,2,NULL,NULL,1,'PLAN 1\nProject'),('FREE_01_P2','2569','Free Elective 1',NULL,8,6,NULL,NULL,8,6,NULL,NULL,2,'PLAN 2\nCo-op'),('FREE_02','2569','Free Elective 2',NULL,8,2,NULL,NULL,8,2,NULL,NULL,1,'PLAN 1\nProject'),('FREE_02_P2','2569','Free Elective 2',NULL,8,7,NULL,NULL,8,7,NULL,NULL,2,'PLAN 2\nCo-op'),('GEN_ELEC1','2569','General Education Elective 1',NULL,7,3,NULL,NULL,7,3,NULL,NULL,1,'PLAN 1\nProject'),('GEN_ELEC2','2569','General Education Elective 2',NULL,7,4,NULL,NULL,7,4,NULL,NULL,1,'PLAN 1\nProject'),('MAJOR_01','2569','IoT Major Elective 1',NULL,6,9,NULL,NULL,6,9,NULL,NULL,NULL,NULL),('MAJOR_02','2569','IoT Major Elective 2',NULL,6,10,NULL,NULL,6,10,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `curriculum_physiot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curriculum_years`
--

DROP TABLE IF EXISTS `curriculum_years`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curriculum_years` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_id` varchar(50) NOT NULL,
  `year` int NOT NULL COMMENT 'Buddhist Era year e.g. 2563',
  `label` varchar(100) NOT NULL COMMENT 'Display label e.g. หลักสูตร 2563',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_dept_year` (`department_id`,`year`),
  CONSTRAINT `curriculum_years_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curriculum_years`
--

LOCK TABLES `curriculum_years` WRITE;
/*!40000 ALTER TABLE `curriculum_years` DISABLE KEYS */;
INSERT INTO `curriculum_years` VALUES (1,'iot',2563,'หลักสูตร พ.ศ. 2563'),(2,'phys',2563,'หลักสูตร พ.ศ. 2563');
/*!40000 ALTER TABLE `curriculum_years` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` varchar(50) NOT NULL,
  `name_th` varchar(200) NOT NULL,
  `name_en` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES ('iot','วิศวกรรมระบบไอโอทีและสารสนเทศ','IoT and Information Engineering'),('phys','ฟิสิกส์','Physics');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `important_dates`
--

DROP TABLE IF EXISTS `important_dates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `important_dates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `event_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `date` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `important_dates`
--

LOCK TABLES `important_dates` WRITE;
/*!40000 ALTER TABLE `important_dates` DISABLE KEYS */;
INSERT INTO `important_dates` VALUES (1,'2024-01-01','วันขึ้นปีใหม่'),(2,'2024-02-14','วันวาเลนไทน์ ❤️'),(3,'2024-04-13','วันสงกรานต์'),(4,'2024-05-01','วันแรงงาน'),(5,'2024-12-05','วันพ่อแห่งชาติ'),(6,'2024-08-12','วันแม่แห่งชาติ'),(9,'2024-06-15','First Day of Semester 1/2024');
/*!40000 ALTER TABLE `important_dates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor_research`
--

DROP TABLE IF EXISTS `professor_research`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor_research` (
  `id` int NOT NULL AUTO_INCREMENT,
  `professor_id` varchar(100) NOT NULL,
  `image` varchar(500) DEFAULT '',
  `link` varchar(1000) DEFAULT '',
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `professor_id` (`professor_id`),
  CONSTRAINT `professor_research_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `professors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor_research`
--

LOCK TABLES `professor_research` WRITE;
/*!40000 ALTER TABLE `professor_research` DISABLE KEYS */;
INSERT INTO `professor_research` VALUES (1,'pikulkaw','/ProfessorResearch/appค้นหาอาชีพในฝัน (1).jpg','',1),(2,'pikulkaw','/ProfessorResearch/cropped-พิกุลแก้ว2-4.jpg','',2),(3,'Bunchana','/ProfessorResearch/cropped-บุณย์ชนะ1-1.jpg','',1),(4,'Bunchana','','https://www.researchgate.net/publication/371016333',2),(5,'Wanwisa','/ProfessorResearch/ระบบการระบุเอกลักษณ์.jpg','',1),(6,'Wanwisa','','https://www.researchgate.net/publication/359396914',2),(7,'Nanchai','','https://www.mdpi.com/1424-8220/23/5/2759',1),(8,'Nanchai','','https://www.mdpi.com/1424-8220/23/5/2759',2),(9,'Kleddaow','/ProfessorResearch/cropped-เกล็ดดาว-3.jpg','',1),(10,'Kleddaow','','https://www.researchgate.net/publication/374225582',2),(11,'Nijjari','','https://www.researchgate.net/publication/342540183',1),(12,'Nijjari','','https://www.researchgate.net/publication/367156079',2),(13,'Thanawich','/ProfessorResearch/cropped-พี่เหน่ง.2-3.jpg','',1),(14,'Thanawich','/ProfessorResearch/cropped-พี่เหน่ง-2.jpg','',2),(15,'Suwili','','',1),(16,'Atthapol','','https://ph01.tci-thaijo.org/index.php/rtna/article/view/240773',1),(17,'Atthapol','','https://www.researchgate.net/publication/374225582',2),(18,'Pannaraton','','',1),(19,'Pannaraton','','',2),(20,'Sorapong','/ProfessorResearch/cropped-สรพง1-1.jpg','',1),(21,'Sorapong','','https://www.researchgate.net/publication/335212933',2),(22,'Paisan','','https://ieeexplore.ieee.org/author/37088659610',1),(23,'Atthasit','/ProfessorResearch/cropped-อรรทสิท2.jpg','',1),(24,'Atthasit','/ProfessorResearch/cropped-อรรทสิท1-1.jpg','',2),(25,'Pitiket','','https://www.researchgate.net/publication/335361939',1),(26,'Pitiket','','',2),(27,'Aphirat','','',1),(28,'Pattariya','','https://www.scopus.com/pages/publications/85030725719',1),(29,'Pattariya','','https://www.scopus.com/pages/publications/85034033959',2),(30,'Sarai','','https://ieeexplore.ieee.org/document/8977354',1),(31,'Ratchanok','','https://www.researchgate.net/publication/286446412',1),(32,'Ratchanok','','https://www.researchgate.net/publication/288494022',2),(33,'Tippawan','','',1),(34,'Tippawan','','',2),(35,'Aphaporn','','https://www.researchgate.net/publication/378685484',1),(36,'Aphaporn','','https://www.researchgate.net/publication/378215922',2),(37,'Pichchanant','','',1),(38,'Metaya','','https://www.researchgate.net/publication/369275624',1),(39,'Metaya','','https://www.researchgate.net/publication/355056551',2),(40,'Thanaphorn','','https://www.scitepress.org/Link.aspx?doi=10.5220/0007959603600367',1),(41,'Thanaphorn','','https://ieeexplore.ieee.org/document/7372320',2),(42,'Surasak','','https://www.scirp.org/journal/paperinformation?paperid=20521',1),(43,'Surasak','','https://www.researchgate.net/publication/262903546',2),(44,'Patarn','','https://www.researchgate.net/publication/378247053',1),(45,'Patarn','','https://www.researchgate.net/publication/377707852',2),(46,'Thammarat','','https://www.researchgate.net/publication/270090490',1),(47,'Thammarat','','https://www.researchgate.net/publication/271570528',2),(48,'Surachart','','https://www.researchgate.net/publication/370625116',1),(49,'Surachart','','https://www.researchgate.net/publication/370979399',2),(50,'Nattaporn','','https://www.researchgate.net/publication/374352580',1),(51,'Nattaporn','','https://www.researchgate.net/publication/375761527',2),(52,'Chertha','','https://www.researchgate.net/publication/377604392',1),(53,'Chertha','','https://www.researchgate.net/publication/374584898',2),(54,'Kritsakorn','','https://www.researchgate.net/publication/369492934',1),(55,'Kritsakorn','','https://www.researchgate.net/publication/369151857',2),(56,'Phanupong','','https://www.researchgate.net/publication/377419379',1),(57,'Phanupong','','https://www.researchgate.net/publication/374089153',2),(58,'Pisan','','https://www.researchgate.net/publication/359102754',1),(59,'Pisan','','https://www.researchgate.net/publication/353324516',2),(60,'Chinnapat','','https://opg.optica.org/abstract.cfm?URI=DH-2023-HTh4B.3',1),(61,'Chinnapat','','',2);
/*!40000 ALTER TABLE `professor_research` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professors`
--

DROP TABLE IF EXISTS `professors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professors` (
  `id` varchar(100) NOT NULL,
  `department_id` varchar(50) NOT NULL,
  `name_th` varchar(300) NOT NULL,
  `position` varchar(300) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `is_head` tinyint(1) DEFAULT '0',
  `education_history` json DEFAULT NULL,
  `expertise` json DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  `research` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `professors_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professors`
--

LOCK TABLES `professors` WRITE;
/*!40000 ALTER TABLE `professors` DISABLE KEYS */;
INSERT INTO `professors` VALUES ('Aphaporn','phys','รศ.ดร.อาภาภรณ์ สกุลการะเวก','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/รศ.ดร.อาภาภรณ์ สกุลการะเวก.jpg','aparporn.sa@kmitl.ac.th',0,'[\"วิทยาศาสตรดุษฎีบัณฑิต/ฟิสิกส์ จุฬาลงกรณ์มหาวิทยาลัย\"]','[\"THIN FILM\", \"THERMOELECTRIC MATERIAL\", \"THERMAL PROPERTY\", \"MATERIAL SCIENCE\", \"MATERIAL CHARACTERIZATION\"]',5,NULL),('Aphirat','iot','ศ.ดร. อภิรัฐ ศิริธราธิวัตร','รองหัวหน้าภาควิชา (ฝ่ายวิจัยและนวัตกรรม)','/IoT_prof/ศ.ดร. อภิรัฐ ศิริธราธิวัตร.jpg','',0,'[]','[]',15,NULL),('Atthapol','iot','ผศ.ดร.อรรถพล ป้อมสถิตย์','อาจารย์ประจำภาควิชา (ผู้ช่วยฝ่ายกิจการภายนอก)','/IoT_prof/ผศ.ดร.อรรถพล ป้อมสถิตย์.jpg','auttapon.po@kmitl.ac.th',0,'[\"B.Eng.(Electronics Engineering) King Mongkuts Institute of Technology Ladkrabang\", \"M.Eng.(Information Engineering) King Mongkuts Institute of Technology Ladkrabang\", \"D.Eng.(Electrical Engineering) King Mongkuts Institute of Technology Ladkrabang\"]','[\"Cyber Security\", \"Internetworking Design\", \"Information Security\"]',9,NULL),('Atthasit','iot','รศ.ดร.อรรถสิทธิ์ หล่าสกุล','อาจารย์พิเศษ','/IoT_prof/อจอรรถ.jpg','attasit.la@kmitl.ac.th',0,'[\"อส.บ. (เทคโนโลยีอิเล็กทรอนิกส์) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\", \"วศ.ม. (วิศวกรรมไฟฟ้า) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\", \"D.Eng. (Electrical Engineering) Tokai University, JAPAN\"]','[\"Digital Processing\", \"Image Watermarking\", \"Embedded Systems\", \"Image Processing\", \"Machine Vision\"]',13,NULL),('Bunchana','iot','รศ.ดร.บุณย์ชนะ ภู่ระหงษ์','ประธานหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ','/IoT_prof/รศ.ดร.บุณย์ชนะ ภู่ระหงษ์.jpg','boonchana.pu@kmitl.ac.th',0,'[\"อส.บ. (เทคโนโลยีอิเล็กทรอนิกส์) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\", \"วศ.ม. (วิศวกรรมสารสนเทศ) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\"]','[\"Microprocessor Application\", \"Microcontroller\", \"Robotic\", \"Internet of Things and Smart System\"]',2,NULL),('Chertha','phys','ศ.ดร.เชรษฐา รัตนพันธ์','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/ศ.ดร.เชรษฐา รัตนพันธ์.jpg','chesta.ru@kmitl.ac.th',0,'[\"ปรัชญาดุษฎีบัณฑิต/ฟิสิกส์ประยุกต์ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\"]','[\"SYNTHESIS\", \"THIN FILM\", \"CHARACTERIZATION\", \"IMPROVEMENT OF THERMOELECTRIC MATERIALS\"]',14,NULL),('Chinnapat','phys','ดร.ชินพรรธน์ รัตนศิรวิทย์','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/ดร.ชินพรรธน์ รัตนศิรวิทย์.jpg','woraka.ne@kmitl.ac.th',0,'[\"Ph.D. Physics North Carolina State University, USA\"]','[\"SURFACE PLASMONIC RESONANCE\", \"NANOTECHNOLOGY\", \"OPTICAL SENSOR\", \"SMART FARMING\", \"STEM EDUCATION\"]',18,NULL),('head_iot','iot','ต้วอย่าง หัวหน้าหลักสูตร','Department Head','https://via.placeholder.com/150','head@kmitl.ac.th',1,'[]','[\"IoT\", \"AI\"]',0,'[]'),('Kleddaow','iot','ผศ.ดร.เกล็ดดาว สัตย์เจริญ','อาจารย์ประจำภาควิชา (ผู้ช่วยฝ่ายต่างประเทศและกิจกรรมคณะ)','/IoT_prof/ผศ.ดร.เกล็ดดาว สัตย์เจริญ.jpg','kleddao.sa@kmitl.ac.th',0,'[\"Doctoral of Philosophy in Computer Science, University of Buckingham, UK\", \"Master of Science in Computing (MERIT), University of Buckingham, UK\", \"Master of Art (Political Science), THAILAND\", \"Bachelor of Science in Management Technology, KMITL, THAILAND\"]','[\"Human computer interaction\", \"User Interfaces\"]',5,NULL),('Kritsakorn','phys','รศ.ดร.กฤษกร โล้เจริญรัตน์','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/รศ.ดร.กฤษกร โล้เจริญรัตน์.jpg','kitsakorn.lo@kmitl.ac.th',0,'[\"Ph.D./ Physical Materials Science , Japan Advanced Institute of Scienceand Technology, 2550, Japan\"]','[\"CANCER\", \"PLASMONIC\", \"NANOPARTICLES\"]',15,NULL),('Metaya','phys','ผศ.ดร.เมตยา กิติวรรณ','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/ผศ.ดร.เมตยา กิติวรรณ.jpg','mettaya.ki@kmitl.ac.th',0,'[\"Ph.D.(Materials Processing), Tohoku University, Japan\"]','[\"NANO-COATING BY ROTARY CHEMICAL VAPOR DEPOSITION\", \"SINTERING OF ADVANCED CERAMICS\", \"MICROWAVE PROCESSING OF MATERIALS\", \"HYDROGEN SEPARATION MEMBRANE\"]',7,NULL),('Nanchai','iot','ผศ.ดร.นัชนัยน์ รุ่งเหมือนฟ้า','รองหัวหน้าภาควิชา (ฝ่ายต่างประเทศและกิจกรรมคณะ)','/IoT_prof/ผศ.ดร.นัชนัยน์ รุ่งเหมือนฟ้า.jpg','natchanai.ro@kmitl.ac.th',0,'[\"B.Eng.(Electronics Engineering) King Mongkuts Institute of Technology Ladkrabang\", \"M.Eng.(Control Engineering) King Mongkuts Institute of Technology Ladkrabang\", \"D.Eng.(Electrical Engineering) King Mongkuts Institute of Technology Ladkrabang\"]','[\"immittance function simulators\", \"active analog filters\", \"oscillator design\", \"chaotic circuit realization\"]',4,NULL),('Nattaporn','phys','ผศ.ดร.ณัฐพร พรหมรส','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/ผศ.ดร.ณัฐพร พรหมรส.jpg','kpnathap@kmitl.ac.th',0,'[\"Doctor of Engineering/Applied Science fro Electronics and Materials, Kyushu University. ญี่ปุ่น\"]','[\"MATERIAL CHARACTERIZATION\", \"THIN FILM\", \"THERMOELECTRIC MATERIAL\", \"THERMAL PROPERTY\", \"MATERIAL SCIENCE\"]',13,NULL),('Nijjari','iot','ผศ.นิจจารีย์ สัตยารักษ์','รองหัวหน้าภาควิชา (ฝ่ายกิจการนักศึกษา)','/IoT_prof/ผศ.นิจจารีย์ สัตยารักษ์.jpg','nitjaree.sa@kmitl.ac.th',0,'[\"วศ.บ. (วิศวกรรมคอมพิวเตอร์) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\", \"วศ.ม. (วิศวกรรมไฟฟ้า) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\"]','[\"Software Engineering\", \"Distributed Testing System\"]',6,'[]'),('Paisan','iot','ผศ.ไพศาล สิทธิโยภาสกุล','อาจารย์พิเศษ','/IoT_prof/อจไพศาล.jpg','paisan-si@kmitl.ac.th',0,'[\"อส.บ. (เทคโนโลยีคอมพิวเตอร์อุตสาหกรรม) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\", \"วศ.ม. (วิศวกรรมไฟฟ้า) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\"]','[\"Wireless Communication\", \"Microprocessor Applications\", \"Digital Filter\"]',12,NULL),('Pannaraton','iot','ผศ.ดร.พนารัตน์ เชิญถนอมวงศ์','อาจารย์ประจำภาควิชา (ผู้ช่วยฝ่ายกิจการภายนอก)','/IoT_prof/ผศ.ดร.พนารัตน์ เชิญถนอมวงศ์.jpg','panarat.ch@kmitl.ac.th',0,'[]','[]',10,NULL),('Patarn','phys','ผศ.ดร.ประธาน บุรณศิริ','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/ผศ.ดร.ประธาน บุรณศิริ.jpg','prathan.bu@kmitl.ac.th',0,'[\"Doctor of Philosophy/Electrical Engineering ,University of Dayton, USA\"]','[\"QUANTITATIVE PHASE IMAGING\", \"DIGITAL HOLOGRAPHY\", \"NONLINEAR OPTIC\", \"LASER STABILIZEATION\", \"PHOTONIC CRYSTAL\", \"METAMATERIAL\", \"METAMATERIAL-MEDICAL PHYSICS\", \"APPLICATIONS OF SYNCHROTRON RADIATION\"]',10,NULL),('Pattariya','phys','รศ.ดร.ภัทรียา ดำรงศักดิ์','หัวหน้าภาควิชาฟิสิกส์\nฟิสิกส์อุตสาหกรรม','/Phys_prof/รศ.ดร.ภัทรียา ดำรงศักดิ์.jpg','pattareeya.da@kmitl.ac.th',1,'[\"Doctor of Philosophy/Engineering Materials University of Southampton อังกฤษ\"]','[\"OPTICAL SPECTROSCOPY\", \"SILICON PHOTOVOLTAICS\", \"FLUORESCENT CONCENTRATORS\", \"THIN FILM LUMINESCENCE\", \"FLUORESCENCE SPECTROSCOPY\"]',1,NULL),('Phanupong','phys','ผศ.ดร.ภาณุพล โขลนกระโทก','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/ผศ.ดร.ภาณุพล โขลนกระโทก.jpg','bhanupol.kl@kmitl.ac.th',0,'[\"วิศวกรรมศาสตรดุษฎีบัณฑิต/วิศวกรรมไฟฟ้า สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\"]','[\"FORENSIC SCIENCE\", \"IMAGE PROCESSING\", \"SPORT SCIENCE\", \"COMPUTER AND ELECTRONICS IN AGRICULTURE\"]',16,NULL),('Pichchanant','phys','ดร.พิชชานันท์ ธีเศรษฐ์โศภน','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/ดร.พิชชานันท์ ธีเศรษฐ์โศภน.jpg','pichanan.te@kmitl.ac.th',0,'[\"วท.บ. ฟิสิกส์, มหาวิทยาลัยเกษตรศาสตร์\", \"วท.ม. ฟิสิกส์เชิงเคมี, มหาวิทยาลัยมหิดล\", \"Ph.D. Energy, สถาบันเทคโนโลยีแห่งเอเซีย\"]','[]',6,NULL),('pikulkaw','iot','ผศ.ดร.พิกุลแก้ว ดังดิสานนท์','อาจารย์ประจําหลักสูตร','/IoT_prof/ผศ.ดร.พิกุลแก้ว ดังดิสานนท์.jpg','pikulkaew.ta@kmitl.ac.th',1,'[\"วศ.บ. (วิศวกรรมสารสนเทศ) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\", \"วศ.ม. (วิศวกรรมสารสนเทศ) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\", \"D.Eng. (Science and Technology) Tokai University, JAPAN\"]','[\"Web Application\", \"Mobile Application\", \"Information Security\"]',1,'[]'),('Pisan','phys','ผศ.ดร.พิศาล ศรีราช','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/ผศ.ดร.พิศาล ศรีราช.jpg','pisan.su@kmitl.ac.th',0,'[\"ปรัชญาดุษฎีบัณฑิต/ฟิสิกส์ มหาวิทยาลัยสงขลานครินทร์\"]','[\"PIEZOELECTRIC MATERIAL\", \"MATERIALS SCIENCE\", \"ENERGY HARVESTING SENSOR\", \"MATERIAL CHARACTERIZATION\"]',17,NULL),('Pitiket','iot','ศ.ดร.ปิติเขต สู้รักษา','หัวหน้าภาควิชา','/IoT_prof/อจปิติเขต.jpg','pitikhate.so@kmitl.ac.th',0,'[\"กศ.บ. เกียรตินิยม (ฟิสิกส์) มหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน\", \"วท.ม. (ฟิสิกส์) มหาวิทยาลัยศรีนครินทรวิโรฒ ประสานมิตร\", \"M.S. (Electrical Engineering) George Washington University, USA\", \"Ph.D. (Electrical Engineering) University of Houston, USA\"]','[\"IT Automation\", \"Industrial Informatics\"]',14,NULL),('Ratchanok','phys','รศ.ดร.รัชนก สมพรเสน่ห์','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/รศ.ดร.รัชนก สมพรเสน่ห์.jpg','ratchanok.so@kmitl.ac.th',0,'[\"Doctor of Philosophy/Physics, University at Buffalo,The State University of NY\"]','[\"NANOELECTRONICS\", \"2D MATERIALS\", \"GRAPHENE\", \"QUANTUM TRANSPORT PHENOMENA\", \"ELECTRICAL CHARACTERIZATION\"]',3,NULL),('Sarai','phys','รศ.ดร.สาหร่าย เล็กชะอุ่ม','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/รศ.ดร.สาหร่าย เล็กชะอุ่ม.jpg','sarai.le@kmitl.ac.th',0,'[\"ปริญญาโท/วศ.ม.(นิวเคลียร์เทคโนโลยี) จุฬาลงกรณ์มหาวิทยาลัย\"]','[\"STIRLING ENGINE\", \"TISSUE\", \"SIMULATION\", \"MEASURING METHOD\", \"INTERNET OF THING TECHNOLOGY\"]',2,NULL),('Sorapong','iot','ผศ.สรพงษ์ วชิรรัตนพรกุล','อาจารย์ประจำภาควิชา (ผู้ช่วยฝ่ายกิจการนักศึกษา)','/IoT_prof/ผศ.สรพงษ์ วชิรรัตนพรกุล.jpg','sorapong.wa@kmitl.ac.th',0,'[\"อส.บ.(เทคโนโลยีอิเล็กทรอนิกส์) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\", \"วศ.ม. (วิศวกรรมไฟฟ้า) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\"]','[\"Analog and Digital Filter\", \"Embedded System\", \"RFID and Application\", \"Information for Energy\"]',11,NULL),('Surachart','phys','อ.สุรชาติ กมลดิลก','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/อ.สุรชาติ กมลดิลก.jpg','kamoldiloks@gmail.com',0,'[\"ปริญญาโท/วท.ม.(สาขาฟิสิกส์ประยุกต์) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\"]','[\"LASERS\", \"OPTICAL INSTRUMENTS\", \"PHOTONICS\", \"FORENSIC SCIENCE\", \"PHYSICS EDUCATION\"]',12,NULL),('Surasak','phys','ผศ.สุรศักดิ์ พิพัฒนศาสตร์','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/ผศ.สุรศักดิ์ พิพัฒน์ศาสตร์.jpg','surasak.pi@kmitl.ac.th',0,'[\"วท.ม.(ฟิสิกส์ประยุกต์) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\"]','[\"OPTICS\", \"ENERGY\"]',9,NULL),('Suwili','iot','ดร.สุวิไล พุ่มโพธิ์','รองหัวหน้าภาควิชา (ฝ่ายกิจการภายนอก)','/IoT_prof/ดร.สุวิไล พุ่มโพธิ์.jpg','suwilai.ph@kmitl.ac.th',0,'[]','[]',8,'[]'),('Thammarat','phys','อ.ธรรมรัตน์ แต่งตั้ง','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/อ.ธรรมรัตน์ แต่งตั้ง.jpg','thammarat.ta@kmitl.ac.th',0,'[\"วศ.ม.วิศวกรรมไฟฟ้า สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\"]','[\"IMAGE PROCESSING\", \"DATA PROCESSING\", \"NP-HARD PROBLEM\", \"ARTIFICIAL INTELLIGENCE\", \"OPTIMIZATION PROBLEM\"]',11,NULL),('Thanaphorn','phys','ผศ.ธนภรณ์ ลีลาวัฒนานนท์','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/ผศ.ธนภรณ์ ลีลาวัฒนานนท์.png','tanaporn.le@kmitl.ac.th',0,'[\"วท.ม./เทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\"]','[\"MODELING AND SIMULATION\", \"SURFACE PLASMONS\", \"OPTICAL DATA COMMUNICATION\"]',8,NULL),('Thanawich','iot','ผศ.ดร.ธนวิชญ์ อนุวงศ์พินิจ','รองหัวหน้าภาควิชา (ฝ่ายวิชาการ)','/IoT_prof/ผศ.ดร.ธนวิชญ์ อนุวงศ์พินิจ.jpg','thanavit.an@kmitl.ac.th',0,'[\"B.Eng.(Information Engineering) King Mongkuts Institute of Technology Ladkrabang\", \"M.Eng.(Information Engineering) King Mongkuts Institute of Technology Ladkrabang\", \"D.Eng.(Electrical Engineering) King Mongkuts Institute of Technology Ladkrabang\"]','[\"Microprocessor Application\", \"Internet of Things\", \"Embedded Systems\"]',7,'[]'),('Tippawan','phys','ผศ.ดร.ศ.ทิพวรรณ คล้ายบุญมี','อาจารย์ผู้รับผิดชอบหลักสูตร','/Phys_prof/ผศ.ดร.ศ.ทิพวรรณ คล้ายบุญมี.jpg','s.tipawan.kh@kmitl.ac.th',0,'[\"วท.บ. ฟิสิกส์ประยุกต์, สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\", \"วท.ม. ฟิสิกส์ประยุกต์, สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\", \"ปร.ด. ฟิสิกส์ประยุกต์, สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\"]','[]',4,NULL),('Wanwisa','iot','ผศ.ดร.วันวิสา ชัชวงษ์','รองหัวหน้าภาควิชา (ฝ่ายการเงิน)','/IoT_prof/ผศ.ดร.วันวิสา ชัชวงษ์.jpg','vanvisa.ch@kmitl.ac.th',0,'[\"อส.บ. เกียรตินิยมอันดับ 2 (เทคโนโลยีอิเล็กทรอนิกส์) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\", \"วศ.ม. (วิศวกรรมสารสนเทศ) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\", \"วศ.ด. (วิศวกรรมไฟฟ้า) สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง\"]','[\"Electronic\", \"Bernstein Filter\", \"Railway Signaling and Operation\", \"Pattern recognition\", \"Railway Communications\"]',3,NULL);
/*!40000 ALTER TABLE `professors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `id` varchar(100) NOT NULL,
  `department_id` varchar(50) NOT NULL,
  `name_th` varchar(300) NOT NULL,
  `position` varchar(300) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `education_history` json DEFAULT NULL,
  `expertise` json DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES ('Thanat','iot','นายธนาตย์ จอมใจเอกชน','เจ้าหน้าที่วิศวกร','/IoT_prof/นายธนาตย์ จอมใจเอกชน.png','','[]','[]',1),('Theerawit','iot','นายธีรสิทธิ์ โท้ทอง','เจ้าหน้าที่วิศวกร','/IoT_prof/นายธีรสิทธิ์ โท้ทอง.jpg','','[]','[]',2);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-08  2:11:25
