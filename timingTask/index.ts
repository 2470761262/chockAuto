const schedule = require("node-schedule");
const autoChockIn = require("../api/chockIn");
const fs = require("fs");
const path = require("path");
const { getTaskTime, normalTime } = require("../util/util");

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../taskConfig.json")).toString()
);
let TaskList = [];
function timingTask() {
  console.log("定时打卡已启动~。");
  //当天首次执行
  toDayRun();
  schedule.scheduleJob("0 * 01 * * 1-5", () => {
    //隔天开始定时任务
    toDayRun();
  });
}

function toDayRun() {
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
    console.log(config.morning.executeTips);
  });

  let noonTask = schedule.scheduleJob(noonTime + " * * 1-5", () => {
    autoChockIn();
    console.log(config.noon.executeTips);
  });

  let nightTask = schedule.scheduleJob(nightTime + " * * 1-5", () => {
    autoChockIn();
    console.log("晚上打卡执行");
    console.log(config.night.executeTips);
  });

  console.log(config.beforeTips);
  console.log("早上:" + normalTime(morningTime));
  console.log("中午:" + normalTime(noonTime));
  console.log("晚上:" + normalTime(nightTime));

  TaskList.push(morningTask, noonTask, nightTask);
}

export { timingTask };
