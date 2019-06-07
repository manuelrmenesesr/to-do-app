CREATE DATABASE `to-do-app`;

USE `to-do-app`;

CREATE TABLE `tasks` (
  `id` varchar(36) PRIMARY KEY,
  `title` varchar(20) NOT NULL UNIQUE,
  `description` text,
  `priority` tinyint(4) NOT NULL,
  `done` BOOLEAN NOT NULL DEFAULT FALSE
);