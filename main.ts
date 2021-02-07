const express = require("express");
const scanRouter = require("./decorate/scanRouter");
const { timingTask } = require("./timingTask/index");
const bodyParser = require('body-parser');
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }))
switch (process.argv[2]) {
  case "dev": // 本地开发
  case "viewConfig"://可视化配置
    app.use(scanRouter.router);
    break;
  case "pro"://正式
    timingTask(); 
    break;
}

app.listen(3000);
