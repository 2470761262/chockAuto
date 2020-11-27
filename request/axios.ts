const axios = require("axios");

//http://sys.lsxjy.com.cn/?SID=FNFXN1606445305951b6
let httpReport = axios.create({
    baseURL: "http://nsysapi.lsxjy.com.cn/", // api 的 base_url
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

module.exports = httpReport;