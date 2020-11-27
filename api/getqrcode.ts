const http = require("../request/axios");
const qs = require("qs");
function getQr(tk) {
    const data = qs.stringify({ isShow: true }, { allowDots: true });
    return new Promise((r) => {
        http({
            method: "post",
            url: "/attendance/apply/checking/qrcode",
            data: data,
            headers: {
                "tk": tk
            }
        }).then(({ data }) => {
            r(data);
        })
    })
}
export =  getQr