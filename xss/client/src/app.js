const express = require("express");
const app = express();

app.use(express.static("public"));

app.listen(3000, () => {
    console.log("客户端启动完成～");
    console.log("http://localhost:3000");
})