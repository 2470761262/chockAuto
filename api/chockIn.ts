const http = require("../request/axios");
const loginApi = require("./login");
const getQR = require("./getqrcode");
const qs = require("qs");
function chockIn(tk) {
    const data = qs.stringify({
        clientType: 1,
        latitude: "",
        longitude: ""

    }, { allowDots: true });
    return new Promise((r) => {
        http({
            method: "post",
            url: "/attendance/apply/checkIn",
            data: data,
            headers: {
                "tk": tk
            }
        }).then(({ data }) => {
            r(data);
        })
    })
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
        console.log(e);
    }

}
export =  autoChockIn