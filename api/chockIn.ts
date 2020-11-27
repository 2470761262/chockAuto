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
    let loginToek = await loginApi();
    await getQR(loginToek);
    return await chockIn(loginToek);
}
export =  autoChockIn