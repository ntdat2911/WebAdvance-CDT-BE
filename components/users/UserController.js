const userService = require('./UserService');

exports.getAll = async (req, res) => {
    try {
        //const user = await userService.getAllUsers();
        res.status(200).json("Success");

    } catch (error) {
        res.status(500).json(error)
    }
}