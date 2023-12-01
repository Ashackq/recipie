const express = require("express");
const authController = require("../controllers/authController");
const tController = require("../controllers/teachersController");

const router = express.Router();

router.route("/").get(tController.getAllteachers);
// .post(
//   authController.protect,
//   authController.restrictTo("admin", "canteen"),
//   canteenItemController.createItem
// );

module.exports = router;

// app.get("/recipes", (req, res) => {
//   const q = "SELECT * FROM recipes";
//   db.query(q, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.json(err);
//     }
//     return res.json(data);
//   });
// });

// app.get("/recipes/:id", (req, res) => {
//     const q = "SELECT * FROM recipes where recipieID = (?)";
//     const id = req.params.id;
//     db.query(q,[id], (err, data) => {
//       if (err) {
//         console.log(err);
//         return res.json(err);
//       }
//       return res.json(data);
//     });
//   });

// app.post("/recipes", (req, res) => {
//   const q = "INSERT INTO recipes(`title`, `descp`, `price`) VALUES (?)";

//   const values = [req.body.title, req.body.descp, req.body.price];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });

// app.delete("/recipes/:id", (req, res) => {
//   const recipes = req.params.id;
//   const q = " DELETE FROM recipes WHERE id = ? ";

//   db.query(q, [recipes], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });

// app.put("/recipes/:id", (req, res) => {
//   const recipes = req.params.id;
//   const q =
//     "UPDATE recipes SET `title`= ?, `descp`= ?, `price`= ? WHERE id = ?";

//   const values = [req.body.title, req.body.descp, req.body.price];

//   db.query(q, [...values, recipes], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });
