const Validator = require('validator');
const isEmpty = require('./is-Empty');

module.exports = function validatePostInput(data) {
    let errors = {}
    data.text = !isEmpty(data.text) ? data.text : '';

    if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
        errors.text = "评论内容最短10个字符！";
    }
    if (Validator.isEmpty(data.text)) {
        errors.text = "评论不能为空";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}