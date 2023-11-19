const verifyRepository = require('./verifyRepository');
const bcrypt = require('bcryptjs');

exports.verifyAccount = async (email)=>{
    await verifyRepository.verifyAccount(email);
}

exports.resetPassword = async (email)=>{
    const result = await verifyRepository.resetPassword(email);
    console.log(result);
    if(result[0].length < 1)
        return false;
    else return true;
}

exports.changePassword = async (email, newpassword) =>{
    console.log(newpassword)
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newpassword, salt);
    await verifyRepository.changePassword(hash, email);
}