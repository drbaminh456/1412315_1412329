-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 10, 2019 at 01:36 PM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `newspaperdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `password` varchar(256) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `account_type` varchar(15) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `username` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `email`, `password`, `first_name`, `last_name`, `birthdate`, `account_type`) VALUES
(1, 'dangbaminh260896@gmail.com', '123456', 'Minh', 'Dang', NULL, 'administrator'),
(2, '1412315@student.hcmus.edu.vn', '123456', 'Minh', 'Dang', NULL, 'editor'),
(3, '1412329@student.hcmus.edu.vn', '123456', 'Minh', 'Vu', NULL, 'writer'),
(4, 'vdminh131@gmail.com', '123456', 'Minh', 'Vu', NULL, 'subscriber'),
(5, 'writer001', '123456', '000', '001', NULL, 'writer'),
(6, 'writer002', '123456', '000', '002', NULL, 'writer'),
(7, 'writer003', '123456', '000', '003', NULL, 'writer'),
(8, 'writer004', '123456', '000', '004', NULL, 'writer'),
(9, 'writer005', '123456', '000', '005', NULL, 'writer'),
(10, 'writer006', '123456', '000', '006', NULL, 'writer'),
(11, 'writer007', '123456', '000', '007', NULL, 'writer'),
(12, 'writer008', '123456', '000', '008', NULL, 'writer'),
(13, 'writer009', '123456', '000', '009', NULL, 'writer'),
(14, 'writer010', '123456', '000', '010', NULL, 'writer'),
(15, 'editor001', '123456', '001', '001', NULL, 'editor'),
(16, 'editor002', '123456', '001', '002', NULL, 'editor'),
(17, 'editor003', '123456', '001', '003', NULL, 'editor'),
(18, 'editor004', '123456', '001', '004', NULL, 'editor'),
(19, 'editor005', '123456', '001', '005', NULL, 'editor'),
(20, 'admin001', '123456', '002', '001', NULL, 'administrator'),
(21, 'admin002', '123456', '002', '002', NULL, 'administrator'),
(22, 'subscriber001', '123456', '003', '001', NULL, 'subscriber'),
(23, 'subscriber002', '123456', '003', '002', NULL, 'subscriber'),
(24, 'subscriber003', '123456', '003', '003', NULL, 'subscriber'),
(25, 'subscriber004', '123456', '003', '004', NULL, 'subscriber'),
(26, 'subscriber005', '123456', '003', '005', NULL, 'subscriber'),
(27, 'dinhhai1002@gmail.com', '489cd5dbc708c7e541de4d7cd91ce6d0f1613573b7fc5b40d3942ccb9555cf35', 'asd', 'Dang', '2411-02-04 12:12:00', 'subscriber');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
