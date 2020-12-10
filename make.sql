DROP DATABASE IF EXISTS trip;
DROP USER IF EXISTS trip_user@localhost;

CREATE DATABASE trip CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER trip_user@localhost IDENTIFIED BY 'Whip&Nay2';
GRANT ALL PRIVILEGES ON trip.* TO trip_user@localhost;