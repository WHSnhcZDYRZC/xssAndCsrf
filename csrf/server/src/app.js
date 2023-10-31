const express = require("express");
const app = express();

app.use(express.static("public"));


app.listen(3001, () => {
    // console.log("服务器端启动完成～");
    console.log("http://localhost:3001");
})