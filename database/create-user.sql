CREATE USER 'mediauser' @'localhost' IDENTIFIED BY 'salaisuus';
GRANT ALL PRIVILEGES ON `MediaSharingApp`.* TO 'mediauser' @'localhost';
FLUSH PRIVILEGES;