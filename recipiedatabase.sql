CREATE DATABASE IF NOT EXISTS dbmsproject;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'skybrowser123';

-- flush privileges;


use dbmsproject;

drop table recipes;
CREATE TABLE IF NOT EXISTS recipes (
    recipieID INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    descp VARCHAR(255) NOT NULL,
    price int
);


select * from recipes;