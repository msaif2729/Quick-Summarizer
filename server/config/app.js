const express = require('express');
const cors = require('cors');
const router = require('../routes/Router')

const app = express();
app.use(cors());
app.use(express.json());


app.use('/summarize',router);

app.use('/',(req,res)=>{
    res.send('API WORKING CORRECTLY!!!');
})


module.exports = app;