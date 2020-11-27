const http = require("../request/axios");
const loginDataConfig = require("../loginDataConfig.json");
function getLogin() {
    return new Promise((r,s) => {
        http({
            method: "post",
            url: "/loginManager/pcLogin",
            data: {
                accountId: 0,
                clientId: 0,
                qrCode: "",
                sessionId: "sssss",
                ...loginDataConfig
            },
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        }).then(({ data }) => {
            if (data.code == 200) {
                r(data.data.token.token);
            } else {
                s(data);
            }
        })
    })
}


module.exports = getLogin