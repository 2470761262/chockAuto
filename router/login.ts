
const { controller, get } = require("../decorate/index");

const autoChockIn = require("../api/chockIn");
@controller("login")
class login {

    @get("/")
    public async loginUser(req, res) {
        res.send(await autoChockIn());
    }
}

