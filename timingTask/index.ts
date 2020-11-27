const schedule = require('node-schedule');
const autoChockIn = require("../api/chockIn");


(() => {
    console.log("定时打卡开始执行");
    // 每天的早上8点29分30秒触发 
    schedule.scheduleJob('30 29 8 * * *', () => {
        autoChockIn();
    });
    // 每天的中午上12点01分30秒触发 
    schedule.scheduleJob('30 01 12 * * *', () => {
        autoChockIn();
    });
    // 每天的中午上12点01分30秒触发 
    schedule.scheduleJob('30 10 18 * * *', () => {
        autoChockIn();
    });
})();

export { }