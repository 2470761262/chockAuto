const express = require('express');
const scanRouter = require("./decorate/scanRouter");
const {timingTask} = require("./timingTask/index");
const app = express();

const ENVIRONMENT = process.argv[2] == "dev";
/**
 * @example: 本地开发
 */
if (ENVIRONMENT) app.use(scanRouter.router);
else timingTask(); //正式



app.listen(3000);
