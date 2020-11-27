const http = require("../request/axios");
function getLogin() {
    return new Promise((r,s) => {
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
                userName: process.argv[3],
            },
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        }).then(({ data }) => {
            if (data.code == 200) {
                r(data.data.token.token);
            } else {
                s(data.message);
            }
        })
    })
}


module.exports = getLogin