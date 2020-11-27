const http = require("../request/axios");
function getLogin() {
    return new Promise((r) => {
        http({
            method: "post",
            url: "/loginManager/pcLogin",
            data: {
                accountId: 0,
                clientId: 0,
                //  passWord: "E99A18C428CB38D5F260853678922E03",
                passWord: "96E79218965EB72C92A549DD5A330112",
                qrCode: "",
                sessionId: "sssss",
                userName: "15280398053",
            },
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        }).then(({ data }) => {
            r(data.data.token.token);
        })
    })
}


module.exports = getLogin