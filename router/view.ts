const { controller, get, post } = require("../decorate/index");
const loginDataConfig = require("../loginDataConfig.json");
const taskConfig = require("../taskConfig.json");
const fs = require("fs");
const path = require("path");

@controller("view")
class viewConfig {

    @get("/")
    public view(req, res) {
        res.render("../public/index", {
            loginDataConfig,
            taskConfig,
        });
    }

    @post("/setConfig")
    public setConfig(req, res) {
        const configData = req.body;
        taskConfig.morning = {
            ...taskConfig.morning,
            hour: configData.morningHour,
            minute: configData.morningMinute,
            second: configData.morningSecond,
        };
        taskConfig.noon = {
            ...taskConfig.noon,
            hour: configData.noonHour,
            minute: configData.noonMinute,
            second: configData.noonSecond,
        };
        taskConfig.night = {
            ...taskConfig.night,
            hour: configData.nightHour,
            minute: configData.nightMinute,
            second: configData.nightSecond,
        };
        fs.writeFile(
            path.join(__dirname, "../taskConfig.json"),
            JSON.stringify(taskConfig, null, 2),
            () => {
                res.render("../public/result");
            }
        );
    }
}

export { };
