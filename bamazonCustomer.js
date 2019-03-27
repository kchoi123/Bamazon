// instantiate npm add-on
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');

// create a connection with the database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
});

// initiate the database connection
connection.connect(function (err) {
    if (err) throw err;
    start();
});

// create a global variable for ID being changed
var purchID;

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // instantiate
        var table = new Table({
            head: ['ID', 'PRODUCT', 'BRAND', 'PRICE', 'QUANTITY']
            , colWidths: [9, 20, 15, 15, 12]
        });

        // table is an Array, so you can `push`, `unshift`, `splice` and friends
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }

        // displaying the table in string
        console.log(table.toString());

        // call the next function
        purchaseID();
    })
}

// calling for ID to pushcase
function purchaseID() {
    // first inquirer prompt on which item to affect
    inquirer.prompt({
        name: "action",
        message: "What is the ID of the item you'd like to purchase? [Quit with Q]",
        type: "input",
        validate: function (value) {
            if (value === "") {
                return false;
            }
            else {
                return true;
            }
        }
    }).then(function (res) {
        if (res.action === "q" || res.action === "Q") {
            end();
        }
        else {
            console.log("You chose item: " + res.action);
            purchID = res.action - 1;
            quantity();
        }
    })
}

// quantity to purchase
function quantity() {
    inquirer.prompt({
        name: "action",
        message: "How many would you like? [Quit with Q]",
        type: "input",
        validate: function (value) {
            if (value === "") {
                return false;
            }
            else {
                return true;
            }
        }
    }).then(function (res) {
        if (res.action === "q" || res.action === "Q") {
            end();
        }
        else {
            connection.query("SELECT * FROM products", function (err, response) {
                if ((response[purchID].stock_quantity - res.action) < 0) {
                    console.log("The quantity you entered exceeds our current stock!");
                    start();
                }
                else {
                    console.log("You have purchased " + res.action + " " + response[purchID].product_name + " for:");
                    // console.log the total price
                    console.log("$" + (res.action * response[purchID].price));
                    var changeQuantity = response[purchID].stock_quantity - res.action;
                    var query = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: changeQuantity
                            },
                            {
                                item_id: purchID+1
                            }
                        ],
                        function (err, res) {
                            start();
                        }
                    );
                }
            })

        }
    })
}

// this is the end function
function end() {
    connection.end();
}