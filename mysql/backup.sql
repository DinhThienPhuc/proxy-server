CREATE DATABASE  IF NOT EXISTS `quizz`
USE `quizz`;


-- Create table: Questions
DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(5000) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `option_1` varchar(5000) DEFAULT NULL,
  `option_2` varchar(5000) DEFAULT NULL,
  `option_3` varchar(5000) DEFAULT NULL,
  `option_4` varchar(5000) DEFAULT NULL,
  `answer` varchar(15000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;


-- Create table: Exams
DROP TABLE IF EXISTS `exams`;
CREATE TABLE `exams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `description` varchar(MAX) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;


-- Create table: Users
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;


-- Create table: Exams-Questions
DROP TABLE IF EXISTS `exams_questions`;
CREATE TABLE `exams_questions` (
  `exam_id` int(11),
  `question_id` int(11),
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;


-- Create table: Users_Exams
DROP TABLE IF EXISTS `users_exams`;
CREATE TABLE `users_exams` (
  `user_id` int(11),
  `exam_id` int(11),
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;


-- Dumping data for table `users`
LOCK TABLES `users` WRITE;
INSERT INTO `users` VALUES (1,'Admin','','admin@quizz.com','Admin permission','male','50');
UNLOCK TABLES;

-- Dumping data for table `questions`
LOCK TABLES `questions` WRITE;
INSERT INTO `questions` 
VALUES 
(1,'When we went back to the bookstore, the bookseller _______ the book we wanted','single-choice','sold','had sold','sells','has sold','had sold'),
(2,'By the end of last summer, the farmers _______ all the crop','single-choice','harvested','had harvested','harvest','are harvested','harvest');
(3,'The room was infested ________ cockroaches','multiple-choice','to','by','at','with','by:::at');
(4,'Do you really believe ________ ghosts','text',NULL,NULL,NULL,NULL,'in');
UNLOCK TABLES;


-- Dumping data for table `exams`
LOCK TABLES `exams` WRITE;
INSERT INTO `exams` VALUES (1,'Civil Services Examination','Indian Administrative Services','admin@quizz.com','Admin permission','male','50');
UNLOCK TABLES;