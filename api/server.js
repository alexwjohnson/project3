const express = require('express'); 
const colours = require('colors');
if (process.env.NODE_ENV !== "production") {             //Load GLV from .env if != prod
    require("dotenv").config()
}
const { errorHandler } = require('./middleware/errorMiddleware'); 
const connectDB = require('./config/db');                         
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use('/api/bugs', require('./routes/bugRoutes'));    
app.use('/api/users', require('./routes/userRoutes'));  
app.use(errorHandler);

app.listen(port, () => console.log(`Bug Server started on http://localhost:${ port }`));
