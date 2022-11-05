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
  `id` int NOT NULL,
  `name` text,
  `description` text,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


-- ----------------------------
-- Table structure for questions
-- ----------------------------
DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `id` int NOT NULL,
  `title` text,
  `type` text,
  `a` text,
  `b` text,
  `c` text,
  `d` text,
  `answer` text,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `firstName` text,
  `lastName` text,
  `email` text,
  `description` text,
  `gender` text,
  `age` int DEFAULT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


-- ----------------------------
-- Table structure for exams_questions
-- ----------------------------
DROP TABLE IF EXISTS `exams_questions`;
CREATE TABLE `exams_questions` (
  `id` int NOT NULL,
  `examId` int DEFAULT NULL,
  `questionId` int DEFAULT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `examId` (`examId`),
  KEY `questionId` (`questionId`),
  CONSTRAINT `exams_questions_ibfk_1` FOREIGN KEY (`examId`) REFERENCES `exams` (`id`),
  CONSTRAINT `exams_questions_ibfk_2` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


-- ----------------------------
-- Table structure for users_exams_questions
-- ----------------------------
DROP TABLE IF EXISTS `users_exams_questions`;
CREATE TABLE `users_exams_questions` (
  `id` int NOT NULL,
  `userId` int DEFAULT NULL,
  `examId` int DEFAULT NULL,
  `questionId` int DEFAULT NULL,
  `userAnswer` text,
  `examScore` text,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `examId` (`examId`),
  KEY `questionId` (`questionId`),
  CONSTRAINT `users_exams_questions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `users_exams_questions_ibfk_2` FOREIGN KEY (`examId`) REFERENCES `exams` (`id`),
  CONSTRAINT `users_exams_questions_ibfk_3` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
