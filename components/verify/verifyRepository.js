const db = require('../../db/index');

exports.verifyAccount = async(email) => {
    await db.connection.execute("UPDATE accounts SET VERIFIED = ? WHERE EMAIL = ?;", ['1',email]);
}

exports.changePassword = async(newpassword, email) => {
    await db.connection.execute("UPDATE accounts SET PASSWORD = ? WHERE EMAIL = ?;", [newpassword, email]);
}