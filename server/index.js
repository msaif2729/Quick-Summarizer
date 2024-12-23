const app = require('./config/app');
const {API_PORT} = require('./config/config');

app.listen(API_PORT,()=>{
    console.log(`App Listening On Port : ${API_PORT}`)
})