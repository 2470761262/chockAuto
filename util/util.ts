//生成从minNum到maxNum的随机数
function randomNum(NumArr:Array<number>):number {
  switch (NumArr.length) {
    case 1:
      return parseInt(String(Math.random() * NumArr[0] + 1), 10);
    case 2:
      return parseInt(String(Math.random() * (NumArr[1] - NumArr[0] + 1) + NumArr[0]), 10);
    default:
      return 0;
  }
}

function getTaskTime(timeConfig):string{
  return `${randomNum(timeConfig.second)} ${randomNum(timeConfig.minute)} ${randomNum(timeConfig.hour)}`;
}

function normalTime(time:string):string{
  return time.split(" ").reverse().join(":")
}

export {
  randomNum,
  getTaskTime,
  normalTime
}