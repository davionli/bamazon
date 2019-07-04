DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(200) NOT NULL,
    department_name VARCHAR(50) DEFAULT "other",
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    sold_quantity INTEGER(10) DEFAULT 0,
    product_sales DECIMAL(10,2) DEFAULT 0,
    PRIMARY KEY (item_id)
);
CREATE TABLE departments (
    department_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(200) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("iPhone Xs", "Electronic", 1199.99, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("iPad Pro", "Electronic", 879.99, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Nintendo Switch", "Electronic", 300.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("T-shirt", "Clothing", 99.99, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Sneaker", "Clothing", 125.00, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Socks", "Clothing", 200.00, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Sofa", "Furniture", 1200, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Bed", "Furniture", 1550, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Lamp", "Furniture", 50, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Table", "Furniture", 100, 50);
SELECT * FROM products;

INSERT INTO departments (department_name, over_head_costs) 
VALUES ("Electronic", 50000);
INSERT INTO departments (department_name, over_head_costs) 
VALUES ("Clothing", 30000);
INSERT INTO departments (department_name, over_head_costs) 
VALUES ("Furniture", 40000);
SELECT * FROM departments;