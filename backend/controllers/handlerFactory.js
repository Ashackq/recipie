const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const db = require("../models/db");

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const q = `SELECT * FROM ${Model}`;

    const queryPromise = () => {
      return new Promise((resolve, reject) => {
        db.query(q, (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      });
    };

    try {
      const doc = await queryPromise();

      res.status(200).json({
        status: "success",
        results: doc.length,
        data: {
          data: doc,
        },
      });
    } catch (err) {
      console.error(err);
      return next(new AppError(err.code, 500));
    }
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = `SELECT * FROM ${Model} WHERE teacher_id = ?`;

    if (popOptions) {
      query = `
        SELECT ${Model}.*, ${popOptions.map((field) => `${field}`).join(", ")}
        FROM ${Model}
        LEFT JOIN ${popOptions.map((field) => `${field}`).join(" LEFT JOIN ")}
        WHERE ${Model}.teacher_id = ?
      `;
    }

    const { id } = req.params;

    try {
      const doc = await db.promise().query(query, [id]);

      if (!doc[0].length) {
        return next(new AppError("No document found with that ID", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          data: doc[0][0],
        },
      });
    } catch (err) {
      console.error(err);
      return next(new AppError(err.code, 500));
    }
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = `SELECT * FROM ${Model} WHERE id = ?`;

    if (popOptions) {
      query = `
        SELECT ${Model}.*, ${popOptions.map((field) => `${field}`).join(", ")}
        FROM ${Model}
        LEFT JOIN ${popOptions.map((field) => `${field}`).join(" LEFT JOIN ")}
        WHERE ${Model}.id = ?
      `;
    }

    const { id } = req.params;

    try {
      const doc = await db.promise().query(query, [id]);

      if (!doc[0].length) {
        return next(new AppError("No document found with that ID", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          data: doc[0][0],
        },
      });
    } catch (err) {
      console.error(err);
      return next(new AppError("Error fetching data from the database", 500));
    }
  });

// Create One Record
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const values = [req.body.title, req.body.descp, req.body.price];
    const query = `INSERT INTO ${Model} (title, descp, price) VALUES (?)`;

    try {
      const result = await db.promise().query(query, [values]);

      res.status(201).json({
        status: "success",
        data: {
          data: { id: result[0].insertId, ...req.body },
        },
      });
    } catch (err) {
      console.error(err);
      return next(new AppError("Error creating document in the database", 500));
    }
  });

// Update One Record
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    const query = `UPDATE ${Model} SET ? WHERE id = ?`;

    try {
      const result = await db.promise().query(query, [body, id]);

      if (result[0].affectedRows === 0) {
        return next(new AppError("No document found with that ID", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          data: { id, ...body },
        },
      });
    } catch (err) {
      console.error(err);
      return next(new AppError("Error updating document in the database", 500));
    }
  });

// Delete One Record
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const query = `DELETE FROM ${Model} WHERE id = ?`;

    try {
      const result = await db.promise().query(query, [id]);

      if (result[0].affectedRows === 0) {
        return next(new AppError("No document found with that ID", 404));
      }

      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      console.error(err);
      return next(
        new AppError("Error deleting document from the database", 500)
      );
    }
  });
