import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

class Product {
	constructor(productID, name, price, desc, location, SellerID) {
	this.productID = productID;
	this.name = name;
	this.price = price;
	this.desc = desc;
  this.location = location;
	this.SellerID = SellerID;
	}
}

class User {
  constructor(userID, name, rating, review, contact, bio, username, email, password) {
    this.userID = userID;
    this.name = name;
    this.rating = rating;
    this.review = review;
    this.contact = contact;
    this.bio = bio;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

let newProduct1 = new Product(1, "2008 whatever", 50, "6800 Wesbrook Mall", "123");
let newProduct2 = new Product(2, "bag 1", 300, "address2", "321");
let newUser1 = new User("123","Edward Kim", "5 out of 5", "Good", "4030103857", "lollol", "eddykisawesome", "eddy@gmail.com", "password")
let newUser2 = new User("321", "Jaden Kim", "5 out of 5", "Good", "4030103857", "lollol", "jaddenkisawesome", "lailaijaden@gmail.com", "password")

let productList = [newProduct1, newProduct2];

app.get('/products',(req,res)=>{
	res.send(productList);
})

app.get('/products/:id',(req,res)=>{
	const product = productList.find(p => p.productID === parseInt(req.params.id));
  product ? res.send(product) : res.status(404).send('Product not found');
})

app.post('/products', (req, res) => {
  const newProduct = new Product(
    req.body.productID,
    req.body.name,
    req.body.price,
    req.body.desc,
    req.body.location,
    req.body.sellerID
  );
  productList.push(newProduct);
  res.status(201).send(newProduct);
	console.log("made new product id: ",req.body.productID);
});

app.listen(3000, () => {
  console.log('Express server initialized');
});