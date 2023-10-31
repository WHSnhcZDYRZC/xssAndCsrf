const express = require("express");
const postBody = require("body-parser");
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();

// 模拟数据库数据
const userList = [{
    username: "zs",
    password: "123",
    operator: 'admin'
}, {
    username: "ls",
    password: "123",
    operator: 'admin'
}]

app.use(cors())

app.use(postBody.urlencoded({ extended: false }));
app.use(postBody.json());

app.use(cookieParser())

app.use(express.static("public"));

const SUCCESS_CODE = 200;
const No_PERMISSIONS_CODE = 401;
const ERROR_CODE = 501;

app.post("/login", (req, res) => {
    const { username, password } = req.body

    const isLogin = userList.some(v =>
        username === v.username && password === v.password
    )

    if (isLogin) {
        res.cookie("isLoign", true, {
            httpOnly: true,
            path: "/"
        });
        res.cookie("operator", username, {
            httpOnly: true,
            path: "/"
        });
        res.send({
            code: SUCCESS_CODE,
            message: "登陆成功！"
        })
    } else {
        res.send({
            code: No_PERMISSIONS_CODE,
            message: "用户名或密码错误！"
        })
    }
})

app.get("/setUser", (req, res) => {
    const { username } = req.query

    if (userList.some(v => v.username === username)) {
        return res.send({
            code: ERROR_CODE,
            message: "用户名重复！"
        })
    }

    const operator = req.cookies.operator;
    const isLoign = req.cookies.isLoign;

    if (!isLoign) return res.send({
        code: ERROR_CODE,
        message: "非法攻击！"
    })

    userList.push({
        username: username,
        password: "123",
        operator: operator
    })

    return res.send({
        code: SUCCESS_CODE,
        message: "添加成功！"
    })
})

app.get("/users", (req, res) => {
    const isLoign = req.cookies.isLoign;

    console.log("isLoign", isLoign);
    if (!isLoign) return res.send({
        code: ERROR_CODE,
        message: "非法攻击！"
    })

    return res.send({
        code: SUCCESS_CODE,
        message: "查询成功！",
        data: userList,
    })

})

app.listen(3000, () => {
    // console.log("客户端启动完成～");
    console.log("http://localhost:3000");
})