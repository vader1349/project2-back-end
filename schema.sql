DROP TABLE IF  EXISTS User;
DROP TABLE IF  EXISTS Card;
CREATE TABLE User(
    email VARCHAR(320) PRIMARY KEY,
    name VARCHAR(20),
    password VARCHAR(20),
    signin_day INT,
    signin_month INT,
    signin_year INT
);
CREATE TABLE Card(
    id SERIAL PRIMARY KEY,
    u_email VARCHAR(320),
    message TEXT,
    text_color VARCHAR(7),
    back_color VARCHAR(7),
    day INT,
    month INT,
    year INT,
    FOREIGN KEY (u_email) REFERENCES User(email)
);
