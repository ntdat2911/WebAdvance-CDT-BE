const verifyRepository = require('./verifyRepository');
const bcrypt = require('bcryptjs');

exports.verifyAccount = async (email)=>{
    await verifyRepository.verifyAccount(email);
}

exports.changePassword = async (email, newpassword) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newpassword, salt);
    await verifyRepository.changePassword(hash, email);
}