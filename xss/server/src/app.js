const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.get("/reflection-xss", (req, res) => {
    const username = req.cookies.username;
    const password = req.cookies.password;
    console.log("username: ", username);
    console.log("password: ", password);
    res.send("注入成功！")
})

app.listen(3001, () => {
    console.log("服务器端启动完成～");
    console.log("http://localhost:3001");
})