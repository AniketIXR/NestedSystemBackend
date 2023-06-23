const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((con)=>{
    console.log("DB connection successful....");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000....');
});