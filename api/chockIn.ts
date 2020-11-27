const qs = require("qs");
const http = require("../request/axios");
const loginApi = require("./login");
const getQR = require("./getqrcode");
const { isString } = require("../util/util");

const maxLoopCount = 3;

function chockIn(tk) {
  const data = qs.stringify(
    {
      clientType: 1,
      latitude: "",
      longitude: "",
    },
    { allowDots: true }
  );
  return new Promise((r) => {
    http({
      method: "post",
      url: "/attendance/apply/checkIn",
      data: data,
      headers: {
        tk: tk,
      },
    }).then(({ data }) => {
      r(data);
    });
  });
}

async function autoChockIn() {
  try {
    const time = new Date().getDay();
    if (time != 0 && time != 6) {
      let loginToek = await loginApi();
      await getQR(loginToek);
      return await chockIn(loginToek);
    } else {
      console.log("今天双休,不自动打卡了阿");
    }
  } catch (e) {
      
    if (isString(e)) {

      console.log(e);

    } else if (e.message.includes("timeout")) {

      if (autoChockIn.runCount++ < maxLoopCount) {

        console.log("打卡超时,将在5秒后重新打卡");
        setTimeout(autoChockIn, 5000);

      } else if (autoChockIn.runCount >= maxLoopCount) {
        console.log("已到自动重新打卡最大次数"+maxLoopCount);
        console.log("现已全部失败,此时间段将会停止重新打卡。");
        console.log("如果因此引发纠纷,请自行处理。");
        console.log("如果因此引发纠纷,请自行处理。");
        console.log("如果因此引发纠纷,请自行处理。");
        autoChockIn.runCount = 0;
        return ;
      }
    }else{
        console.log("未知错误。");
        console.log(e.message);
    }
  }
}
autoChockIn.runCount = 0;
export = autoChockIn;
