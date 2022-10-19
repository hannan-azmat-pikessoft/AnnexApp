import moment from "moment"
import Strings from "../translation/language"

export function validateEmail(mail) {
    if (mail == '') {
        return ({ msg: Strings.err_empty_email, success: false })
    }
    else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return ({ msg: Strings.err_enter_valid_email, success: false })
    }
    else {
        return ({ msg: '', success: true })
    }
}

export function isInputEmpty(value) {
    if (value == '') {
        return ({ msg: '', success: false })
    }
    else {
        return ({ msg: '', success: true })
    }
}

export function isData(value) {
    if (!value) {
        return ({ msg: '', success: false })
    }
    else {
        return ({ msg: '', success: true })
    }
}

export function isArrayEmpty(value) {
    if (value == '' || value == []) {
        return ({ msg: '', success: false })
    }
    else {
        return ({ msg: '', success: true })
    }
}

export function validatePassword(password) {
    let errors = [
        { isDone: false, title: Strings.err_signup_password_min_length, type: 'length' },
        { isDone: false, title: Strings.err_signup_password_min_1_lowerCase, type: 'lowercase' },
        { isDone: false, title: Strings.err_signup_password_min_1_upperCase, type: 'uppercase' },
        { isDone: false, title: Strings.err_signup_password_min_1_number, type: 'number' },
        { isDone: false, title: Strings.err_signup_password_min_1_special_character, type: 'special' }
    ]
    if (password == '') {
        return ({ msg: Strings.err_signup_empty_password, success: false })
    }

    if (password.length >= 8) {
        for (let i = 0; i < errors.length; i++) {
            if (errors[i].type == 'length') {
                errors[i] = { isDone: true, title: Strings.err_signup_password_min_length, type: 'length' }
                break
            }
        }
    }
    if (/[a-z]/.test(password)) {
        for (let i = 0; i < errors.length; i++) {
            if (errors[i].type == 'lowercase') {
                errors[i] = { isDone: true, title: Strings.err_signup_password_min_1_lowerCase, type: 'lowercase' }
                break
            }
        }
    }
    if (/[A-Z]/.test(password)) {
        for (let i = 0; i < errors.length; i++) {
            if (errors[i].type == 'uppercase') {
                errors[i] = { isDone: true, title: Strings.err_signup_password_min_1_upperCase, type: 'uppercase' }
                break
            }
        }
    }
    if (/[0-9]/.test(password)) {
        for (let i = 0; i < errors.length; i++) {
            if (errors[i].type == 'number') {
                errors[i] = { isDone: true, title: Strings.err_signup_password_min_1_number, type: 'number' }
                break
            }
        }
    }
    if (/[#?!@$%^&*-]/.test(password)) {
        for (let i = 0; i < errors.length; i++) {
            if (errors[i].type == 'special') {
                errors[i] = { isDone: true, title: Strings.err_signup_password_min_1_special_character, type: 'special' }
                break
            }
        }
    }

    return errors
}

export function validateConfirmPassword(password, confirmPassword) {
    if (confirmPassword == '') {
        return ({ msg: Strings.error_empty_confirm_password, success: false })
    }
    else if (confirmPassword !== password) {
        return ({ msg: Strings.error_password_confirm_password_not_match, success: false })
    }
    else {
        return ({ msg: '', success: true })
    }
}

export function validateMobileNumber(number) {
    var mob = /^[0-9]{9}$/;
    if (number === "") {
        return ({ msg: Strings.err_empty_mobileNo, success: false })
    } else if (mob.test(number) == false) {
        return ({ msg: Strings.err_valid_mobileNo, success: false })
    }
    return ({ msg: '', success: true })
}

export function validateUserName(username) {
    if (username == '') {
        return ({ msg: Strings.error_empty_username, success: false })
    }
    else if (username.length < 6 || username.length > 30) {
        return ({ msg: Strings.error_invalid_username, success: false })
    }
    else {
        return ({ msg: '', success: true })
    }
}

export function minCharValidation(text, min, emptyErr, minCharErr) {
    if (text == '') {
        return ({ msg: emptyErr, success: false })
    }
    else if (text.length < min) {
        return ({ msg: minCharErr, success: false })
    }
    else {
        return ({ msg: '', success: true })
    }
}
export function isDate(date) {
    // return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
    // const _regExp = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$');
    // return _regExp.test(date);
    return moment(date).isValid()
}