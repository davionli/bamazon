require('dotenv').config();
var inquirer = require("inquirer");
var mysql = require("mysql");
var bamazonLogo = require("./bamazonLogo.js");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: process.env.DATABASE_PORT,
    user: "root",
    password: process.env.DATABASE_PASSWORD,
    database: "bamazon_db"
});
connection.connect(function(err) {
    if (err) throw err;
    bamazonLogo();
    manager();
});
function displayProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        manager();
    });
}
function displayLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        if (err) throw err;
        console.table(res);
        manager();
    });
}
function addInventory() {
    inquirer.prompt([
        {
            name: "product",
            message: "Please, enter the item id to add product inventory: "
        },
        {
            name: "quantity",
            message: "Please enter the amount: "
        }
    ]).then(response=> {

        var product = parseInt(response.product);
        var quantity = parseInt(response.quantity);
        connection.query(`SELECT stock_quantity FROM products WHERE item_id = ${product}`, function(err, res) {
            if (err) throw err;
            quantity += res[0].stock_quantity
            var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                    stock_quantity: quantity
                    },
                    {
                    item_id: product
                    }
                ],
                function(err, res) {
                    if (err) throw err;
                    console.log("product updated successfully!");
                    manager();
                }
            );
            query.sql;
        });
    });
}
function addProduct() {
    var departmentSet = new Set();
    var departmentList = [];
    connection.query("SELECT department_name FROM departments", function(err, res) {
        if (err) throw err;
        res.forEach(element=> {
            departmentSet.add(element.department_name);
        });
        departmentSet.forEach(element=> {
            departmentList.push(element);
        });
        inquirer.prompt([
            {
                type: "list",
                name: "department",
                message: "Which department does it belongs to?",
                choices: departmentList
            },
            {
                name: "name",
                message: "What's the product name?"
            },
            {
                name: "price",
                message: "what's the unit price?"
            },
            {
                name: "quantity",
                message: "How many of them are in stock?"
            }
        ]).then(response=> {
            var query = connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: response.name,
                    department_name: response.department,
                    price: parseFloat(response.price),
                    stock_quantity: parseInt(response.quantity)
                },
                function(earr, res) {
                    if (err) throw err;
                    console.log("Successfully add new product.");
                    manager();
                }
            );
            query.sql;
        });
    });
}
function manager() {
    inquirer.prompt([
        {
            name: "menu",
            type: "rawlist",
            message: "Welcome manager, what would you want to do today?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
        }
    ]).then(response=>{
        switch (response.menu) {
            case "View Products for Sale": 
                displayProducts();
                break;
            case "View Low Inventory":
                displayLow();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
            default:
                connection.end();
        }
    });
}
