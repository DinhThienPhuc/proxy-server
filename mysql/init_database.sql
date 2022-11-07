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
