-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 03, 2025 lúc 09:41 AM
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
-- Cấu trúc bảng cho bảng `capystarapi_questionbank`
--

CREATE TABLE `capystarapi_questionbank` (
  `id_question` int(11) NOT NULL,
  `question` longtext NOT NULL,
  `question_type` varchar(50) NOT NULL,
  `option_a` varchar(200) DEFAULT NULL,
  `option_b` varchar(200) DEFAULT NULL,
  `option_c` varchar(200) DEFAULT NULL,
  `option_d` varchar(200) DEFAULT NULL,
  `correct_answer` varchar(200) DEFAULT NULL,
  `passage` longtext DEFAULT NULL,
  `grammar_rule` longtext DEFAULT NULL,
  `grammar_example` longtext DEFAULT NULL,
  `audio_text` varchar(255) DEFAULT NULL,
  `transcript` longtext DEFAULT NULL,
  `level_id` varchar(100) NOT NULL,
  `topic_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Đang đổ dữ liệu cho bảng `capystarapi_questionbank`
--

INSERT INTO `capystarapi_questionbank` (`id_question`, `question`, `question_type`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `passage`, `grammar_rule`, `grammar_example`, `audio_text`, `transcript`, `level_id`, `topic_id`) VALUES
(5, 'Bạn có cảm thấy lo lắng khi phải nói chuyện bằng tiếng Anh không?', 'reading', 'Rất lo lắng, thường xuyên tránh né', 'Hơi lo lắng, nhưng vẫn cố gắng', 'Khá tự tin, sẵn sàng nói chuyện', 'Hoàn toàn tự tin', '', NULL, NULL, NULL, NULL, NULL, 'A1', 6),
(6, 'Bạn thường học tiếng Anh bằng hình thức nào (lớp học, tự học, online, kết hợp)?', 'reading', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A1', 6),
(7, 'Khó khăn lớn nhất của bạn khi học tiếng Anh là gì?', 'reading', 'Thiếu từ vựng', 'Ngữ pháp phức tạp', 'Nghe – Nói khó luyện tập', 'Thiếu động lực, thời gian', NULL, NULL, NULL, NULL, NULL, NULL, 'A1', 6),
(8, 'Bạn mong muốn đạt được mục tiêu tiếng Anh trong bao lâu (3 tháng, 6 tháng, 1 năm...)?', 'reading', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'A1', 6),
(9, '(Animals – A1) Choose the best word: \'active at night\'.', 'vocabulary', 'nocturnal', 'migrate', 'predator', 'herbivore', 'A', NULL, NULL, NULL, NULL, NULL, 'A1', 1),
(10, '(Animals – A1) Choose the best word: \'move seasonally from one region to another\'.', 'vocabulary', 'nocturnal', 'predator', 'herbivore', 'migrate', 'D', NULL, NULL, NULL, NULL, NULL, 'A1', 1),
(11, '(Animals – A1) Choose the best word: \'an animal that hunts other animals\'.', 'vocabulary', 'migrate', 'herbivore', 'predator', 'nocturnal', 'C', NULL, NULL, NULL, NULL, NULL, 'A1', 1),
(12, '(Animals – A1) Choose the best word: \'an animal that eats plants\'.', 'vocabulary', 'predator', 'herbivore', 'nocturnal', 'migrate', 'B', NULL, NULL, NULL, NULL, NULL, 'A1', 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `capystarapi_questionbank`
--
ALTER TABLE `capystarapi_questionbank`
  ADD PRIMARY KEY (`id_question`),
  ADD KEY `CapyStarAPI_question_level_id_fbdf9430_fk_CapyStarA` (`level_id`),
  ADD KEY `CapyStarAPI_question_topic_id_44378dc3_fk_CapyStarA` (`topic_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `capystarapi_questionbank`
--
ALTER TABLE `capystarapi_questionbank`
  MODIFY `id_question` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1209;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `capystarapi_questionbank`
--
ALTER TABLE `capystarapi_questionbank`
  ADD CONSTRAINT `CapyStarAPI_question_level_id_fbdf9430_fk_CapyStarA` FOREIGN KEY (`level_id`) REFERENCES `capystarapi_levels` (`id_level`),
  ADD CONSTRAINT `CapyStarAPI_question_topic_id_44378dc3_fk_CapyStarA` FOREIGN KEY (`topic_id`) REFERENCES `capystarapi_topic` (`id_Topic`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
