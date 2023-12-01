const factory = require("./handlerFactory");

exports.getAllteachers = factory.getAll("recipes");
exports.getteachersById = factory.getOne("recipes");
exports.createTeacher = factory.createOne("recipes");
exports.updateTeacher = factory.updateOne("recipes");
exports.deleteTeacher = factory.deleteOne("recipes");
