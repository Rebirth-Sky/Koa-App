const Validator = require('validator');
const isEmpty = require('./is-Empty');

module.exports = function validateRegisterInput(data) {
    let errors = {}
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.passwordRepeat = !isEmpty(data.name) ? data.passwordRepeat : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = "名字不能为空";
    }
    if (!Validator.isLength(data.name, { min: 4, max: 30 })) {
        errors.name = "名字的长度不符";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "邮箱不合法!";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "邮箱不能为空";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
        errors.password = "password为6~20位字符！";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "password不能为空!";
    }
    if (!Validator.isLength(data.password2, { min: 6, max: 20 })) {
        errors.password2 = "password2为6~20位字符！";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "password2不能为空!";
    }


    if (!Validator.equals(data.password, data.password2)) {
        errors.password = "两次密码不一致！";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}