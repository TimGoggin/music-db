# music-db
hw2

1. Create a new database named "music-db" in myPHPadmin
2. Run the following SQL query:


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";




CREATE TABLE `artists` (
  `song` varchar(255) NOT NULL,
  `artist` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `artists` (`song`, `artist`) VALUES
('Days of Wine and Roses', 'Bill Evans'),
('Freeway', 'Aimee Mann'),
('These Walls', 'Kendrick Lamar');


CREATE TABLE `ratings` (
  `id` int(1) NOT NULL,
  `username` varchar(255) NOT NULL,
  `song` varchar(255) NOT NULL,
  `rating` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `ratings` (`id`, `username`, `song`, `rating`) VALUES
(1, 'Amelia-Earhart', 'Freeway', 3),
(2, 'Amelia-Earhart', 'Days of Wine and Roses', 4),
(3, 'Otto', 'Days of Wine and Roses', 5),
(4, 'Amelia-Earhart', 'These Walls', 4);



CREATE TABLE `users` (
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `users` (`Username`, `Password`) VALUES
('Amelia-Earhart', 'Youaom139&yu7'),
('Otto', 'StarWars2*');


ALTER TABLE `artists`
  ADD PRIMARY KEY (`song`);


ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`),
  ADD KEY `song` (`song`);


ALTER TABLE `users`
  ADD PRIMARY KEY (`Username`);


ALTER TABLE `ratings`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;


ALTER TABLE `artists`
  ADD CONSTRAINT `song_constraint` FOREIGN KEY (`song`) REFERENCES `ratings` (`song`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ratings`
  ADD CONSTRAINT `username_constraint` FOREIGN KEY (`username`) REFERENCES `users` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

