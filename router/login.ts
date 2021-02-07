
const { controller, get } = require("../decorate/index");

const autoChockIn = require("../api/chockIn");

@controller("login")
class login {

    @get("/")
    public async loginUser(req, res) {

        res.send(await autoChockIn({
            "userName": "15280398053",
            "passWord": "96E79218965EB72C92A549DD5A330112"
        }));
    }
}

export {}
