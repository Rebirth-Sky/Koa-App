const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const tools = {
    enbcrypt(password){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    compareSync(p1,p2){
        var result =  bcrypt.compareSync(p1,p2); 
        return result;
    },
    sign(obj,privateKey,expiresIn){
        return jwt.sign(obj,privateKey,expiresIn);
    }

};

module.exports  = tools;