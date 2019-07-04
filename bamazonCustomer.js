require('dotenv').config();
var mysql = require("mysql");
var bamazonLogo = require("./bamazonLogo.js");
var inquirer = require("inquirer");
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
    customer();
});

function customer() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
    //   Log all results of the SELECT statement
    //   console.log(res);
    //   console.log(bamazonLogo);
        function shopping() {
            inquirer.prompt([
                {
                    message: "WHat is the ID of the item you would like to purchase? [Quit with Q]",
                    name: "itemId"
                },
                {
                    message: "How many would your like? [Quit with Q]",
                    name: "orderQuantity"
                }
            ]).then(response=>{
                if (response.itemId!=="q"&&response.itemId!=="Q"&&response.orderQuantity!=="q"&&response.orderQuantity!=="Q") {
                    connection.query(`SELECT * FROM products WHERE ?`, {item_id: parseInt(response.itemId)}, function(err, res) {
                        if (err) throw err;
                        var currentItem = res[0];
                        if (parseInt(response.orderQuantity) > currentItem.stock_quantity) {
                            console.log(`Insufficient quantity!`);
                            shopping();
                        }
                        else {
                            var query = connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                {
                                    stock_quantity: currentItem.stock_quantity - parseInt(response.orderQuantity),
                                    sold_quantity: currentItem.sold_quantity + parseInt(response.orderQuantity),
                                    product_sales: currentItem.product_sales + parseInt(response.orderQuantity) * parseFloat(currentItem.price)
                                },
                                {
                                    item_id: parseInt(response.itemId)
                                }
                                ],
                                function(err, res) {
                                if (err) throw err;
                                console.log(`Successfully purchased ${parseInt(response.orderQuantity)} of ${currentItem.product_name}!\n`);
                                }
                            );
                            query.sql;
                            customer();
                        }
                    });
                }
                else {
                    connection.end();
                }
            });
        }
        console.table(res);
        shopping();
    });

}






  