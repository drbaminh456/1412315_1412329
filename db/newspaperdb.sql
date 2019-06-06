-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 04, 2019 at 01:46 AM
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
create database newspaperdb;
use newspaperdb;
-- --------------------------------------------------------

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `first_name` varchar(50) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `last_name` varchar(50) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `account_type` varchar(15) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `username` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `email`, `password`, `first_name`, `last_name`, `account_type`) VALUES
(1, 'dangbaminh260896@gmail.com', '123456', 'Minh', 'Dang', 'administrator'),
(2, '1412315@student.hcmus.edu.vn', '123456', 'Minh', 'Dang', 'editor'),
(3, '1412329@student.hcmus.edu.vn', '123456', 'Minh', 'Vu', 'writer'),
(4, 'vdminh131@gmail.com', '123456', 'Minh', 'Vu', 'subscriber');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Kinh doanh'),
(2, 'Tài chính - Ngân hàng'),
(3, 'Văn hóa - Xã hội');

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

DROP TABLE IF EXISTS `sub_category`;
CREATE TABLE IF NOT EXISTS `sub_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentCategoryId` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`id`, `parentCategoryId`, `name`) VALUES
(1, 1, 'Nông sản'),
(2, 1, 'Hải sản'),
(3, 2, 'Chứng khoán'),
(4, 2, 'Bảo hiểm'),
(5, 3, 'Văn hóa'),
(6, 3, 'Xã hội'),
(7, 3, 'Đời sống');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
