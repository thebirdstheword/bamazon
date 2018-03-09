CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(250) NOT NULL,
department_name VARCHAR(250),2
price DECIMAL(5,2) NOT NULL,
stock_quantity INTEGER NOT NULL,
PRIMARY KEY (item_id));
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("socks", "clothing", 8.99, 30);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("hats", "accessories", 20.00, 26);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("headphones", "accessories", 42.78, 70);
select * from products;