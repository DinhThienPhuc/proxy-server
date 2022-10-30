/*
 Navicat Premium Data Transfer

 Source Server         : quizz
 Source Server Type    : MySQL
 Source Server Version : 80031 (8.0.31)
 Source Host           : localhost:3306
 Source Schema         : quizz

 Target Server Type    : MySQL
 Target Server Version : 80031 (8.0.31)
 File Encoding         : 65001

 Date: 23/10/2022 18:28:08
*/

CREATE DATABASE  IF NOT EXISTS `quizz`;
USE `quizz`;

ALTER USER 'root'@'localhost' IDENTIFIED BY 'quizz'; 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'quizz';

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for exams
-- ----------------------------
DROP TABLE IF EXISTS `exams`;
CREATE TABLE `exams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of exams
-- ----------------------------
BEGIN;
INSERT INTO `exams` (`id`, `name`, `description`) VALUES (1, 'IELTS exam 1', 'Test ieltes');
INSERT INTO `exams` (`id`, `name`, `description`) VALUES (2, 'IELTS exam 2', 'Test ieltes');
INSERT INTO `exams` (`id`, `name`, `description`) VALUES (3, 'IELTS exam 3', 'Test ieltes');
INSERT INTO `exams` (`id`, `name`, `description`) VALUES (4, 'IELTS exam 4', 'Test ieltes');
INSERT INTO `exams` (`id`, `name`, `description`) VALUES (5, 'IELTS exam 5', 'Test ieltes');
INSERT INTO `exams` (`id`, `name`, `description`) VALUES (6, 'IELTS exam 6', 'Test ieltes');
INSERT INTO `exams` (`id`, `name`, `description`) VALUES (7, 'IELTS exam 7', 'Test ieltes');
INSERT INTO `exams` (`id`, `name`, `description`) VALUES (8, 'IELTS exam 8', 'Test ieltes');
INSERT INTO `exams` (`id`, `name`, `description`) VALUES (9, 'IELTS exam 9', 'Test ieltes');
INSERT INTO `exams` (`id`, `name`, `description`) VALUES (10, 'IELTS exam 10', 'Test ieltes');
COMMIT;

-- ----------------------------
-- Table structure for exams_questions
-- ----------------------------
DROP TABLE IF EXISTS `exams_questions`;
CREATE TABLE `exams_questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `exam_id` int DEFAULT NULL,
  `question_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `exam_id` (`exam_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `exams_questions_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  CONSTRAINT `exams_questions_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of exams_questions
-- ----------------------------
BEGIN;
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (1, 1, 1);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (2, 1, 2);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (3, 1, 3);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (4, 1, 4);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (5, 1, 5);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (6, 1, 6);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (7, 1, 7);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (8, 1, 8);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (9, 1, 9);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (10, 1, 10);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (11, 2, 1);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (12, 2, 3);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (13, 2, 4);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (14, 2, 7);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (15, 2, 8);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (16, 2, 12);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (17, 2, 13);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (18, 2, 14);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (19, 2, 20);
INSERT INTO `exams_questions` (`id`, `exam_id`, `question_id`) VALUES (20, 2, 21);
COMMIT;

-- ----------------------------
-- Table structure for questions
-- ----------------------------
DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text,
  `type` text,
  `option_1` text,
  `option_2` text,
  `option_3` text,
  `option_4` text,
  `answer` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of questions
-- ----------------------------
BEGIN;
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (1, 'Question 1', 'MULTIPLE_CHOICE', '1', '2', '3', '4', '4::2');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (2, 'Question 2', 'SINGLE_CHOICE', '4', '3', '3', '1', '1');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (3, 'Question 3', 'FILL_MISSING_TEXT', NULL, NULL, NULL, NULL, 'with');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (4, 'Question 4', 'MULTIPLE_CHOICE', '1', '2', '3', '4', '4::2');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (5, 'Question 5', 'SINGLE_CHOICE', '4', '3', '3', '1', '1');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (6, 'Question 6', 'FILL_MISSING_TEXT', NULL, NULL, NULL, NULL, 'with');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (7, 'Question 7', 'MULTIPLE_CHOICE', '1', '2', '3', '4', '4::2');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (8, 'Question 8', 'SINGLE_CHOICE', '4', '3', '3', '1', '1');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (9, 'Question 9', 'FILL_MISSING_TEXT', NULL, NULL, NULL, NULL, 'with');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (10, 'Question 10', 'MULTIPLE_CHOICE', '1', '2', '3', '4', '4::2');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (11, 'Question 11', 'SINGLE_CHOICE', '4', '3', '3', '1', '1');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (12, 'Question 12', 'FILL_MISSING_TEXT', NULL, NULL, NULL, NULL, 'with');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (13, 'Question 13', 'MULTIPLE_CHOICE', '1', '2', '3', '4', '4::2');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (14, 'Question 14', 'SINGLE_CHOICE', '4', '3', '3', '1', '1');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (15, 'Question 15', 'FILL_MISSING_TEXT', NULL, NULL, NULL, NULL, 'with');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (16, 'Question 16', 'MULTIPLE_CHOICE', '1', '2', '3', '4', '4::2');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (17, 'Question 17', 'SINGLE_CHOICE', '4', '3', '3', '1', '1');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (18, 'Question 18', 'FILL_MISSING_TEXT', NULL, NULL, NULL, NULL, 'with');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (19, 'Question 19', 'MULTIPLE_CHOICE', '1', '2', '3', '4', '4::2');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (20, 'Question 20', 'SINGLE_CHOICE', '4', '3', '3', '1', '1');
INSERT INTO `questions` (`id`, `title`, `type`, `option_1`, `option_2`, `option_3`, `option_4`, `answer`) VALUES (21, 'Question 21', 'FILL_MISSING_TEXT', NULL, NULL, NULL, NULL, 'with');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` text,
  `last_name` text,
  `email` text,
  `description` text,
  `gender` text,
  `age` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=456790 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `description`, `gender`, `age`) VALUES (123456, 'Tuyen', 'Phung', 'tuyenpc@gmail.com', '\"\"', 'male', 24);
INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `description`, `gender`, `age`) VALUES (456789, 'Phuc', 'Dinh', 'phucdt@gmail.com', 'hahaha', 'male', 28);
COMMIT;

-- ----------------------------
-- Table structure for users_exams_questions
-- ----------------------------
DROP TABLE IF EXISTS `users_exams_questions`;
CREATE TABLE `users_exams_questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `exam_id` int DEFAULT NULL,
  `question_id` int DEFAULT NULL,
  `user_answer` text,
  `exam_score` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `exam_id` (`exam_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `users_exams_questions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `users_exams_questions_ibfk_2` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  CONSTRAINT `users_exams_questions_ibfk_3` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of users_exams_questions
-- ----------------------------
BEGIN;
INSERT INTO `users_exams_questions` (`id`, `user_id`, `exam_id`, `question_id`, `user_answer`, `exam_score`) VALUES (1, 123456, 1, 1, "2::3", "80/100");
INSERT INTO `users_exams_questions` (`id`, `user_id`, `exam_id`, `question_id`, `user_answer`, `exam_score`) VALUES (2, 123456, 1, 2, "1", "80/100");
INSERT INTO `users_exams_questions` (`id`, `user_id`, `exam_id`, `question_id`, `user_answer`, `exam_score`) VALUES (3, 123456, 1, 3, "up", "80/100");
INSERT INTO `users_exams_questions` (`id`, `user_id`, `exam_id`, `question_id`, `user_answer`, `exam_score`) VALUES (4, 123456, 1, 4, "4::2", "80/100");
INSERT INTO `users_exams_questions` (`id`, `user_id`, `exam_id`, `question_id`, `user_answer`, `exam_score`) VALUES (5, 123456, 1, 5, "2", "80/100");
INSERT INTO `users_exams_questions` (`id`, `user_id`, `exam_id`, `question_id`, `user_answer`, `exam_score`) VALUES (6, 123456, 1, 6, "with", "80/100");
INSERT INTO `users_exams_questions` (`id`, `user_id`, `exam_id`, `question_id`, `user_answer`, `exam_score`) VALUES (7, 123456, 1, 7, "4::3::2", "80/100");
INSERT INTO `users_exams_questions` (`id`, `user_id`, `exam_id`, `question_id`, `user_answer`, `exam_score`) VALUES (8, 123456, 1, 8, "7", "80/100");
INSERT INTO `users_exams_questions` (`id`, `user_id`, `exam_id`, `question_id`, `user_answer`, `exam_score`) VALUES (9, 123456, 1, 9, "meo", "80/100");
INSERT INTO `users_exams_questions` (`id`, `user_id`, `exam_id`, `question_id`, `user_answer`, `exam_score`) VALUES (10, 123456, 1, 10, "7::8", "80/100");
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
