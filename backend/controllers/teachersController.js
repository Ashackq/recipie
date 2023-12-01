const factory = require("./handlerFactory");
const teachers = "teachers";

exports.getAllteachers = factory.getAll(teachers);
exports.getteachersById = factory.getOne(teachers);
exports.createTeacher = factory.createOne(teachers);
exports.updateTeacher = factory.updateOne(teachers);
exports.deleteTeacher = factory.deleteOne(teachers);
exports.deleteTeacher = factory.getOne(teachers);