const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))


app.use("/customer/auth/*", async function auth(req, res, next) {
  const tokenz = req.headers.authorization;
  let token;
  if (tokenz.startsWith('Bearer ')) {
   token = tokenz.slice(7);}

  console.log('qqqqqqqqqq',token);
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  const secret = "fingerprint_customer";
  console.log('token',token);
  console.log('secret',secret);
  console.log(token==secret);
  try {
      await verifyToken(token, secret);
   //   req.user = userData;
     next();
  } catch (error) {
   // console.log(error);
      return res.status(403).json({ message: 'Failed to authenticate token.' });
  }
});

function verifyToken(token, secret) {
  try {
    const decoded = jwt.verify(token, secret);
    console.log('Decoded payload:', decoded);
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
  }

}

const PORT = 5003;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
