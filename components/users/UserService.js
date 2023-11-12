const userRepository = require('./UserRepository');

exports.getAllUsers = async() => {
    return await userRepository.getAllUsers();
}