-- create product table --
CREATE TABLE product(
id_product SERIAL PRIMARY KEY,
name VARCHAR(120) NOT NULL,
brand VARCHAR(120) NOT NULL,
category_id VARCHAR(100) NOT NULL,
size TEXT NOT NULL DEFAULT 'S' CHECK(size IN('S','M','L','XL')),
color TEXT NOT NULL DEFAULT 'white' CHECK(color IN('white', 'red', 'blue')),
price integer NOT NULL,
seller_id VARCHAR(100) NOT NULL,
photo VARCHAR(120) NOT NULL,
description VARCHAR(120) NOT NULL
ADD CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES category (id_category)
ADD CONSTRAINT fk_seller_id FOREIGN KEY (seller_id) REFERENCES seller (id_seller)
);

-- create category table --
CREATE TABLE category(
id_category SERIAL PRIMARY KEY,
name VARCHAR(120) NOT NULL);

-- create seller table --
CREATE TABLE seller(
id_seller SERIAL PRIMARY KEY,
username VARCHAR(20) NOT NULL,
password TEXT NOT NULL,
name VARCHAR(120) NOT NULL,
email VARCHAR(120) NOT NULL,
phone integer,
role VARCHAR(120)
);

-- create transaction table --
CREATE TABLE transactions(
id_transactions SERIAL PRIMARY KEY,
product_id integer NOT NULL,
quantity integer NOT NULL,
total_amount integer NOT NULL,
payment_type TEXT NOT NULL DEFAULT 'transfer bank' CHECK(payment_type IN('transfer bank','GOPAY','DANA','OVO', 'Link Aja')),
payment_status TEXT NOT NULL DEFAULT 'pending' CHECK(payment_status IN('pending','paid')),
shipped_date DATE,
transaction_status TEXT NOT NULL DEFAULT 'process' CHECK(transaction_status IN('process', 'packing', 'delivery', 'arrived')),
customer_id integer NOT NULL,
seller_id integer NOT NULL);

-- create customer table --
CREATE TABLE customer(
id_customer SERIAL PRIMARY KEY,
username VARCHAR(20) NOT NULL,
password TEXT NOT NULL,
name VARCHAR(120) NOT NULL,
email VARCHAR(120) NOT NULL,
phone integer,
gender TEXT NOT NULL DEFAULT 'male' CHECK(gender IN('male', 'female')),
date_of_birth DATE NOT NULL,
city TEXT NOT NULL,
address TEXT NOT NULL,
postal_code integer NOT NULL);

-- create users table --
CREATE TABLE users(
id VARCHAR(120) PRIMARY KEY,
email VARCHAR(50) NOT NULL,
password TEXT NOT NULL,
fullname VARCHAR(100) NOT NULL,
role VARCHAR(120) NOT NULL
)