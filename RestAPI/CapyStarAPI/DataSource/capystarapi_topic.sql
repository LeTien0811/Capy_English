-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 03, 2025 lúc 09:38 AM
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
-- Cấu trúc bảng cho bảng `capystarapi_topic`
--

CREATE TABLE `capystarapi_topic` (
  `id_Topic` bigint(20) NOT NULL,
  `Topic_name` varchar(100) NOT NULL,
  `Topic_description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `capystarapi_topic`
--

INSERT INTO `capystarapi_topic` (`id_Topic`, `Topic_name`, `Topic_description`) VALUES
(1, 'Animals', 'Các câu hỏi liên quan đến động vật, môi trường sống và tập tính.'),
(2, 'Technology', 'Các câu hỏi về công nghệ, thiết bị, phần mềm và xu hướng số.'),
(3, 'Food & Drink', 'Các câu hỏi về ẩm thực, nấu ăn, nguyên liệu và đồ uống.'),
(4, 'Travel', 'Các câu hỏi về du lịch, điểm đến, văn hóa và trải nghiệm.'),
(5, 'Health', 'Các câu hỏi về sức khỏe, dinh dưỡng, thể chất và lối sống lành mạnh.'),
(6, 'started question', 'Đây là chủ đề giành cho câu hỏi bắt đầu');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `capystarapi_topic`
--
ALTER TABLE `capystarapi_topic`
  ADD PRIMARY KEY (`id_Topic`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `capystarapi_topic`
--
ALTER TABLE `capystarapi_topic`
  MODIFY `id_Topic` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
