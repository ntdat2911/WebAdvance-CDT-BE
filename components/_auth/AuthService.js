const authorizeRepository = require('./AuthRepository');
const bcrypt = require('bcryptjs');

exports.getUserByEmail = async (email, social) => {
    return await authorizeRepository.getUserByEmail(email, social);
}

exports.checkEmailExists = async (email) => {
    if (await authorizeRepository.emailExists(email))
        return true;
    else return false;
}

exports.checkIsSocial = async (email) => {
    const result = await authorizeRepository.isSocial(email)
    if (result)
        return result;
    else return false;
}

exports.register = async (fullname, email, password, social) => {
    // if(await authorizeRepository.phonenumberExists(phonenumber))
    //     throw new Error('Phone number is exists!');
    if (social) {
        return await authorizeRepository.insertUserSocial(fullname, email, password);
    }
    return await authorizeRepository.insertUser(fullname, email, password);
}


