// dependencies and creating connection to database
var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // username
    user: "root",

    // password
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
  });
  
  function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);

      userInput();

      // connection.end();
    });
  }

  function userInput() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemID",
            message: "what is the ID of the item you would like to buy?"
        },
        {
            type: "input",
            name: "productUnits",
            message: "how many units of the product would you like to buy?"
        }
    ]).then(answers => {
       console.log(answers.itemID);

       connection.query("SELECT * FROM products WHERE item_id = " + answers.itemID, function(err, res) {
        if (err) throw err;
        console.log(res);
        if (answers.productUnits > res[0].stock_quantity) {
            console.log("Insufficient quantity :(")
        }
        else {
            // grab the price from database res
            // multiple by user quantity
            // give the total back via consolelog
            console.log("Proceed with order")
            var paymentDue = answers.productUnits * res[0].price;
            var newQuantity = res[0].stock_quantity - answers.productUnits;
            updateItemQuantity(newQuantity, answers.itemID, paymentDue);
        }
       });
    });
  }

  function updateItemQuantity(updatedQuantity, itemID, paymentDue) {
      connection.query("UPDATE products SET stock_quantity = " + updatedQuantity + " WHERE item_id = " + itemID + ";", function(err, res) {
        if (err) throw err;

        console.log("Your total due is " + paymentDue);
      }
    );
  }