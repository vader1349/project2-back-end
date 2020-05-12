DROP DATABASE IF EXISTS private;
DROP USER IF EXISTS private_user;

CREATE DATABASE private CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER private_user IDENTIFIED BY '020499@uwec';
GRANT ALL PRIVILEGES ON private.* TO private_user;
