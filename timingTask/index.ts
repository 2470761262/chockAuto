const schedule = require("node-schedule");
const autoChockIn = require("../api/chockIn");
const fs = require("fs");
const path = require("path");
const { getTaskTime, normalTime } = require("../util/util");

const config = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../taskConfig.json")).toString()
);

const moerLoginDataConfig = require("../loginDataConfig.json");
function timingTask() {
    console.log("定时打卡已启动~。");
    console.log("当前打卡总人数为:" + moerLoginDataConfig.length);
    moerLoginDataConfig.forEach(element => {
        //当天首次执行
        toDayRun(element);
        console.log();
        console.log("----分割线---");
        console.log();
    });
}

function toDayRun(loginData) {
    let TaskList = [];
    let morningTime = getTaskTime(config.morning);
    let noonTime = getTaskTime(config.noon);
    let nightTime = getTaskTime(config.night);

    let morningTask = schedule.scheduleJob(morningTime + " * * 1-5", () => {
        autoChockIn(loginData);
        console.log(config.morning.executeTips + ",用户为:" + loginData.userName);
    });

    let noonTask = schedule.scheduleJob(noonTime + " * * 1-5", () => {
        autoChockIn(loginData);
        console.log(config.noon.executeTips + ",用户为:" + loginData.userName);
    });

    let nightTask = schedule.scheduleJob(nightTime + " * * 1-5", () => {
        autoChockIn(loginData);
        console.log(config.night.executeTips + ",用户为:" + loginData.userName);
    });

    console.log(config.beforeTips + " | --- | " + new Date().toLocaleDateString());
    console.log("当前用户为:" + loginData.userName);
    console.log("早上:" + normalTime(morningTime));
    console.log("中午:" + normalTime(noonTime));
    console.log("晚上:" + normalTime(nightTime));
    TaskList.push(morningTask, noonTask, nightTask);
    let toDayWalkTask = schedule.scheduleJob("0 01 01 * * 1-5", () => {
        if (TaskList.length > 0) {
            try {
                TaskList.forEach((item, i) => {
                    if (item) {
                        item.cancel();
                    }
                });
                TaskList = [];
                console.log(config.newDayTips);
            } catch {
                console.log(TaskList);
            }


        }
        //隔天开始定时任务
        toDayRun(loginData);
    });
    TaskList.push(toDayWalkTask);

}

export { timingTask };
