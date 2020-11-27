const schedule = require('node-schedule');
const autoChockIn = require("../api/chockIn");


function timingTask() {
    console.log("定时打卡开始执行");
    // 每天的早上8点29分30秒触发 
    schedule.scheduleJob('30 29 8 * * *', () => {
        autoChockIn();
        console.log("早上打卡执行");
    });
    // 每天的中午上12点01分30秒触发 
    schedule.scheduleJob('30 01 12 * * *', () => {
        autoChockIn();
        console.log("中午打卡执行");
    });
    // 每天的中午上12点01分30秒触发 
    schedule.scheduleJob('30 10 18 * * *', () => {
        autoChockIn();
        console.log("晚上打卡执行");
    });
}

export{
    timingTask
}