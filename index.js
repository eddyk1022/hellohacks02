import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(express.json());
app.use(cors());

npm install csv-parser

app.get('/', (req, res) => {
  res.send('Hello World!');
});

class Product {
	constructor(productID, name, price, sellerID) {
	this.productID = productID;
	this.name = name;
	this.price = price;
	this.sellerID = sellerID;
	}
}

class User {
  constructor(userID, name, email, contact) {
    this.userID = userID;
    this.name = name;
    this.email = email;
    this.password = contact;
  }
}
//let newProduct1 = new Product(1, "1901 ford something", 50, "123");
//let newProduct2 = new Product(2, "bag 1", 300, "address2", "321");
//let newUser1 = new User("123","Edward Kim", "5 out of 5", "Good", "4030103857", "lollol", "eddykisawesome", "eddy@gmail.com", "password")
//let newUser2 = new User("321", "Jaden Kim", "5 out of 5", "Good", "4030103857", "lollol", "jaddenkisawesome", "lailaijaden@gmail.com", "password")

let productList = $.csv.toObjects("products.csv");

const csv = require('csv-parser');
const fs = require('fs');

app.get('/products.html/:id', (req, res) => {
  let productList = [];
  fs.createReadStream('products.csv')
    .pipe(csv())
    .on('data', (row) => {
      productList.push(row);
    })
    .on('end', () => {
      const product = productList.find(p => p.productID === req.params.id);
      product ? res.send(product) : res.status(404).send('Product not found');
    });
});

app.post('/productmaker.html', (req, res) => {
  const newProduct = new Product(
    req.body.productID,
    req.body.name,
    req.body.price,
    req.body.sellerID
  );
  //productList.push(newProduct);

  // Prepare the line to append to the CSV
  const newLine = `${newProduct.productID},${newProduct.name},${newProduct.price},${newProduct.sellerID}\n`;

  // Append the new product to the CSV file
	print("123")
  fs.appendFile('products.csv', newLine, (err) => {
    if (err) throw err;
    console.log('Saved to CSV.');
  });

  res.status(201).send(newProduct);
  console.log("made new product id: ", req.body.productID);
});

app.listen(3000, () => {
  console.log('Express server initialized');
});