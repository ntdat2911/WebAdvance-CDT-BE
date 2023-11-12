const db = require('../../db/index');

exports.getAllUsers = async() => {
    const result = await db.connection.execute("select * from accounts");
    return result[0].length > 0 ? result[0] : null;
}