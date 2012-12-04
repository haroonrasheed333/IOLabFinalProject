-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2012 at 04:43 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `iolab_comm`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `comm_id` int(11) NOT NULL AUTO_INCREMENT,
  `comm_name` varchar(100) NOT NULL,
  `comm_email` varchar(100) NOT NULL,
  `comm_dis` text NOT NULL,
  `post_id_fk` int(11) NOT NULL,
  PRIMARY KEY (`comm_id`),
  KEY `post_id_fk` (`post_id_fk`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=45 ;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comm_id`, `comm_name`, `comm_email`, `comm_dis`, `post_id_fk`) VALUES
(1, 'Haroon', 'Haroon@gmail.com', 'What are you saying?', 1),
(3, 'bharath', 'bharath@gmail.com', 'qwerty', 1),
(4, 'Bharath1', 'efe@gmail.com', 'qwerty', 1),
(5, 'Bharath2', 'g@gmail.com', 'comment3', 1),
(17, 'bharath', 'bharath1', 'bharath3', 1),
(19, 'h1', 'h1', 'h1', 20),
(20, 'b1', 'b1', 'b1', 1),
(21, 's1', 's1', 's1', 22),
(22, 's2', 's2', 's2', 22),
(23, 'b2', 'b2', 'b2', 1),
(24, 's3', 's3', 's3', 22),
(25, 'v1', 'v1', 'v1', 25),
(26, 'b3', 'b3', 'b3', 1),
(27, 'v2', 'v2', 'v2', 25),
(28, 'b4', 'b4', 'b4', 1),
(29, 'b5', 'b5', 'b5', 1),
(30, 'h2', 'h2', 'h2', 20),
(31, 'm1', 'm1', 'm1', 31),
(32, 'b6', 'b6', 'b66666666666666666666666666666666666666666666666666666666666666666666666666', 1),
(33, 'b7', 'b7', 'b7', 1),
(34, 'b8', 'b8', 'b8', 1),
(35, 'b9', 'b9', 'This is the most awesome clooege in the world. this this this thi this this tni wegslgns esglksjg seglkne', 1),
(36, 'bh', 'bh', 'bh', 1),
(37, 'webiew', 'wtw', 'wer', 1),
(38, '1', '1', '1', 1),
(39, '1', '1', '1', 1),
(40, '2', '2', '2', 1),
(41, 'w', 'w', 'w', 108),
(42, '3', '3', '3', 1),
(43, '1', '1', '1', 117),
(44, '4', '4', '4', 1);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `post_title` varchar(200) NOT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_title` (`post_title`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=125 ;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `post_title`) VALUES
(108, 'Bannari Amman Institute of Technology'),
(112, 'Fordham University'),
(114, 'Georgia Institute of Technology'),
(106, 'Harvard Law School'),
(20, 'Harvard University'),
(111, 'Hebrew University of Jerusalem'),
(117, 'Humboldt University of Berlin'),
(31, 'Madras Institute of Technology'),
(115, 'Radford University'),
(22, 'Stanford University'),
(1, 'University of California, Berkeley'),
(25, 'Vellore Institute of Technology');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id_fk`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
