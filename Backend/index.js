const express = require("express")
const cors = require("cors");
const app = express();
require("./db/config");
const register = require('./router/userRegister')

app.use(express.json());
app.use(cors());
app.use(register)




app.listen(4000, () => {
    console.log("server start on port 4000");
  });