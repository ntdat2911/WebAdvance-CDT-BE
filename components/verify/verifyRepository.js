const db = require('../../db/index');

exports.verifyAccount = async(email) => {
    await db.connection.execute("UPDATE accounts SET VERIFIED = ? WHERE EMAIL = ? and sociallogin = ? limit 1;", ['1',email, "0"]);
}

exports.changePassword = async(newpassword, email) => {
    await db.connection.execute("UPDATE accounts SET PASSWORD = ? WHERE EMAIL = ? and sociallogin = ? limit 1;", [newpassword, email, "0"]);
}

exports.resetPassword = async(email) => {
    return await db.connection.execute("SELECT * FROM accounts WHERE EMAIL = ? and sociallogin = ? limit 1;", [email, "0"]);
}
