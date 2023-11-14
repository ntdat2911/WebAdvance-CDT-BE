const authorizeRepository = require('./AuthRepository');
const bcrypt = require('bcryptjs');

exports.getUserByEmail = async(email) => {
    return await authorizeRepository.getUserByEmail(email);
}

exports.checkEmail = async(email) => {
    if(!await authorizeRepository.emailExists(email))
        throw new Error('Email is not exists!');
}

exports.register = async (fullname, email, password)=>{
    // if(await authorizeRepository.phonenumberExists(phonenumber))
    //     throw new Error('Phone number is exists!');
    if(await authorizeRepository.emailExists(email))
        return 'Email exists';
    
    return await authorizeRepository.insertUser(fullname, email, password);
}
