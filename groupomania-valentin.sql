-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mer. 15 juin 2022 à 13:06
-- Version du serveur : 5.7.34
-- Version de PHP : 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania-valentin`
--
CREATE DATABASE IF NOT EXISTS `groupomania-valentin` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `groupomania-valentin`;

-- --------------------------------------------------------

--
-- Structure de la table `Comments`
--

CREATE TABLE `Comments` (
  `id` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `author` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Comments`
--

INSERT INTO `Comments` (`id`, `postId`, `userId`, `author`, `content`, `createdAt`, `updatedAt`) VALUES
(3, 6, 1, 'ainsi', 'Coucou le grand retour !', '2022-06-06 10:44:01', '2022-06-08 15:36:57'),
(4, 6, 1, 'ainsi', 'Wonderful comment !!!', '2022-06-08 15:55:36', '2022-06-08 15:55:36'),
(5, 6, 1, 'ainsi', 'Wonderful comment 2 !!!', '2022-06-08 15:56:29', '2022-06-08 15:56:29');

-- --------------------------------------------------------

--
-- Structure de la table `Posts`
--

CREATE TABLE `Posts` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `nbLikes` int(11) NOT NULL,
  `nbDislikes` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Posts`
--

INSERT INTO `Posts` (`id`, `userId`, `title`, `content`, `imageUrl`, `author`, `nbLikes`, `nbDislikes`, `createdAt`, `updatedAt`) VALUES
(2, 1, 'ketchups', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut orci convallis, convallis dolor eget, malesuada lacus. Aliquam eleifend ac magna molestie sagittis. Sed arcu massa, tempor et rhoncus auctor, bibendum vitae ex. Nam pretium turpis sit amet felis consequat, pretium vulputate dui malesuada. Fusce viverra elit sed magna elementum, et suscipit mauris facilisis. Proin et ante venenatis, commodo felis ut, imperdiet augue. Aenean auctor laoreet placerat. Cras et vestibulum urna, pharetra aliquam nibh. Sed eleifend felis eu ullamcorper blandit. Proin quis dui tortor. Morbi nec sollicitudin enim. ', 'http://localhost:8000/images/posts/dennis-klein-FzB_512zvP0-unsplash1654179596068.jpeg', 'ainsi', 1, 0, '2022-06-02 14:19:56', '2022-06-11 10:42:36'),
(3, 1, 'mustard', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut orci convallis, convallis dolor eget, malesuada lacus. Aliquam eleifend ac magna molestie sagittis. Sed arcu massa, tempor et rhoncus auctor, bibendum vitae ex. Nam pretium turpis sit amet felis consequat, pretium vulputate dui malesuada. Fusce viverra elit sed magna elementum, et suscipit mauris facilisis. Proin et ante venenatis, commodo felis ut, imperdiet augue. Aenean auctor laoreet placerat. Cras et vestibulum urna, pharetra aliquam nibh. Sed eleifend felis eu ullamcorper blandit. Proin quis dui tortor. Morbi nec sollicitudin enim. ', 'http://localhost:8000/images/posts/homemade-yellow-mustard-fp1654179619519.jpeg', 'ainsi', 0, 1, '2022-06-02 14:20:19', '2022-06-11 10:31:13'),
(5, 2, 'mayo', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut orci convallis, convallis dolor eget, malesuada lacus. Aliquam eleifend ac magna molestie sagittis. Sed arcu massa, tempor et rhoncus auctor, bibendum vitae ex. Nam pretium turpis sit amet felis consequat, pretium vulputate dui malesuada. Fusce viverra elit sed magna elementum, et suscipit mauris facilisis. Proin et ante venenatis, commodo felis ut, imperdiet augue. Aenean auctor laoreet placerat. Cras et vestibulum urna, pharetra aliquam nibh. Sed eleifend felis eu ullamcorper blandit. Proin quis dui tortor. Morbi nec sollicitudin enim. ', 'http://localhost:8000/images/posts/mayonaise-recette-de-la-mayonaise-recettes-sauces1654181491724.jpeg', 'joe', 0, 1, '2022-06-02 14:51:31', '2022-06-11 11:29:38'),
(6, 1, 'netflix', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor cursus elit, vel vestibulum eros porta eget. Etiam vel tempor erat, eu pretium elit. Sed nisi odio, dignissim nec quam ac, accumsan accumsan turpis. Integer leo velit, bibendum id mattis at, vehicula eu velit. Sed luctus arcu non luctus faucibus. Phasellus dictum malesuada ullamcorper. Pellentesque at purus mollis, consequat diam ac, facilisis nisi. Aenean bibendum orci at ligula vulputate convallis at id nisi. Phasellus ullamcorper dui in augue aliquet pharetra. Sed ut pellentesque mi. Aenean sollicitudin magna purus, eu finibus odio dictum in. ', 'http://localhost:8000/images/posts/logo-netflix-n1654184773003.png', 'ainsi', 1, 0, '2022-06-02 15:46:13', '2022-06-11 11:30:08');

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `likes` json NOT NULL,
  `dislikes` json NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `pseudo`, `email`, `password`, `avatar`, `likes`, `dislikes`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'ainsi', 'sylvain@contact.fr', '$2b$10$QDgfKOjhzYdQbM7MKm53muBb6g0F92MezSUsrVCTOmtBdQzi.ZBTK', 'http://localhost:8000/images/avatars/11653979671162.jpeg', '{\"postsId\": [2, 6]}', '{\"postsId\": [3, 5]}', 0, '2022-05-23 15:52:08', '2022-06-11 11:30:08'),
(2, 'joe', 'joe@contact.fr', '$2b$10$XhGTcbIP7NRWtQlATY/xWexuVe/wsuCuUHN8DTmlzvRl9IxMaUvVq', '../public/assets/avatars/blank-profile.png', '{}', '{}', 0, '2022-06-02 14:50:53', '2022-06-02 14:50:53'),
(3, 'admin', 'admin@contact.fr', '$2b$10$U3sEwWm0BCAyn2VvQxc4ZumPuUHmZ7TYTRcp.0H20O//Y81x1Uqn.', '../public/assets/avatars/blank-profile.png', '{}', '{}', 1, '2022-06-02 14:52:00', '2022-06-02 14:53:10');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
