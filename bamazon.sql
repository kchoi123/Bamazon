DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL (12,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro", "Apple", 1999.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Razer 15 Laptop", "Razer", 1090.99, 98);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shoes", "Adidas", 125.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("67 LED TV", "Samsung", 999.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keyboard", "Ducky", 230.56, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mouse", "SteelSeries", 79.99, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fire TV", "Amazon", 39.99, 101);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Firewall", "Cisco Meraki", 599.99, 78);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Switch", "Netgear", 399.99, 57);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wireless AP", "Aruba", 299.87, 66);