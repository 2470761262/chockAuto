const express = require('express');
import 'reflect-metadata';
const router = express.Router();

function controller(path: string) {
    return function (target: any) {
        Object.keys(target.prototype).forEach((key) => {
            let getRotuer = Reflect.getMetadata('get', target.prototype, key);
            let postRotuer = Reflect.getMetadata('post', target.prototype, key);
            if(getRotuer) router.get("/"+path+getRotuer, target.prototype[key]);
            if(postRotuer) router.post("/"+path+postRotuer, target.prototype[key]);
        })
    }
}
//

function get(path: string) {
    return function (target, protypeName) {
        Reflect.defineMetadata("get", path, target, protypeName);
    }
}
function post(path: string) {
    return function (target, protypeName) {
        Reflect.defineMetadata("post", path, target, protypeName);
    }
}
export {
    router,
    controller,
    get,
    post
}
