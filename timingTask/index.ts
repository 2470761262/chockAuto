const schedule = require("node-schedule");
const autoChockIn = require("../api/chockIn");
const fs = require("fs");
const path = require("path");
const { getTaskTime, normalTime } = require("../util/util");

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../taskConfig.json")).toString()
);

function timingTask() {
  let TaskList = [];
  console.log("定时打卡已启动~。");
  schedule.scheduleJob("0 * 01 * * 1-5", () => {
    if (TaskList.length > 0) {
      TaskList.forEach((i) => {
        if (i.cancel) i.cancel();
      });
      console.log(config.newDayTips);
    }
    let morningTime = getTaskTime(config.morning);
    let noonTime = getTaskTime(config.noon);
    let nightTime = getTaskTime(config.night);

    let morningTask = schedule.scheduleJob(morningTime + " * * 1-5", () => {
      autoChockIn();
      console.log("早上打卡执行");
    });

    let noonTask = schedule.scheduleJob(noonTime + " * * 1-5", () => {
      autoChockIn();
      console.log("中午打卡执行");
    });

    let nightTask = schedule.scheduleJob(nightTime + " * * 1-5", () => {
      autoChockIn();
      console.log("晚上打卡执行");
      console.log(config.afterTips);
    });

    console.log(config.beforeTips);
    console.log("早上:" + normalTime(morningTime));
    console.log("中午:" + normalTime(noonTime));
    console.log("晚上:" + normalTime(nightTime));

    TaskList.push(morningTask, noonTask, nightTask);
  });
}

export { timingTask };
