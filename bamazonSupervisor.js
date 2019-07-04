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
    database: "bamazon_db",
    multipleStatements: true
});
connection.connect(function(err) {
    if (err) throw err;
    bamazonLogo();
    supervisor();
});
function viewSales() {
    var query_string = "SET sql_mode = '';";
    query_string += "SELECT departments.department_id,departments.department_name,departments.over_head_costs, SUM(products.product_sales) AS total_sales, SUM(products.product_sales)-departments.over_head_costs AS total_profit FROM departments INNER JOIN products ON products.department_name = departments.department_name  GROUP BY departments.department_name;";
    connection.query(query_string, function(err, res) {
        if (err) throw err;
        console.table(res[1]);
        supervisor();
    });
}
function createDepartment() {
    inquirer.prompt([
        {
            name: "name",
            message: "What's the name of the new department?"
        },
        {
            name: "costs",
            message: "How much is the over head costs?"
        }
    ]).then(response=> {
        var query = connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: response.name,
                over_head_costs: parseFloat(response.costs)
            },
            function(err, res) {
                if (err) throw err;
                console.log("Successfully add new department.");
                supervisor();
            }
        );
        query.sql;
    });
}
function supervisor() {
    inquirer.prompt([
        {
            type: "rawlist",
            name: "menu",
            message: "Welcome manager, what would you want to do today?",
            choices: ["View Product Sales by Department", "Create New Department", "Quit"]
        }
    ]).then(response=> {
        switch(response.menu) {
            case "View Product Sales by Department":
                viewSales();
                break;
            case "Create New Department":
                createDepartment();
                break;
            default:
                connection.end();
        }
    });
}