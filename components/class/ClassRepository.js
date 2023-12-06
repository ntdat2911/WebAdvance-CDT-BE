const db = require("../../db/index");

exports.getAClass = async (id) => {
  const result = await db.connection.execute(
    "select * from class where id = ?",
    [id]
  );
  return result[0].length > 0 ? result[0] : null;
};

exports.insertAClass = async (
  className,
  createdBy,
  description,
  title,
  topic,
  room
) => {
  const result = await db.connection.execute(
    "insert into class (name,createdBy,description,title,topic,room) values (?,?,?,?,?,?)",
    [className, createdBy, description, title, topic, room]
  );
  return result[0].insertId;
};

exports.updateAClass = async (
  id,
  className,
  description,
  title,
  topic,
  room
) => {
  const result = await db.connection.execute(
    "update class set name=?where id=?",
    [className, description, title, topic, room, id]
  );
  return result[0];
};
