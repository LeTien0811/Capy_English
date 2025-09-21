-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 03, 2025 lúc 09:39 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `capystar`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `capystarapi_levels`
--

CREATE TABLE `capystarapi_levels` (
  `id_level` varchar(100) NOT NULL,
  `Level_name` varchar(255) NOT NULL,
  `Level_description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `capystarapi_levels`
--

INSERT INTO `capystarapi_levels` (`id_level`, `Level_name`, `Level_description`) VALUES
('A1', 'Beginner', 'Có thể hiểu và sử dụng các cụm từ quen thuộc hàng ngày'),
('A2', 'Elementary', 'Có thể giao tiếp trong các tình huống đơn giản thường ngày'),
('B1', 'Intermediate', 'Có thể hiểu các điểm chính của thông tin chuẩn về các chủ đề quen thuộc'),
('B2', 'Upper Intermediate', 'Có thể giao tiếp độc lập và thảo luận về nhiều chủ đề'),
('C1', 'Advanced', 'Có thể sử dụng tiếng Anh linh hoạt và hiệu quả cho mục đích xã hội, học thuật và nghề nghiệp'),
('C2', 'Proficiency', 'Có thể hiểu hầu hết mọi thứ đã nghe hoặc đọc một cách dễ dàng');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `capystarapi_levels`
--
ALTER TABLE `capystarapi_levels`
  ADD PRIMARY KEY (`id_level`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
