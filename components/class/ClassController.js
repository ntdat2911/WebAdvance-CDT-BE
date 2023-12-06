const classService = require("./ClassService");

exports.getAClass = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await classService.getAClass(id);

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.insertAClass = async (req, res) => {
  try {
    const { className, createdBy, description, title, topic, room } = req.body;

    const insertId = await classService.insertAClass(
      className,
      createdBy,
      description,
      title,
      topic,
      room
    );
    res.status(200).json({ insertId });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateAClass = async (req, res) => {
  try {
    const { id, className, description, title, topic, room } = req.body;
    classService.updateAClass(id, className, description, title, topic, room);
    res.status(200).json("Success");
  } catch (error) {
    res.status(500).json(error);
  }
};
