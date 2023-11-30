import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "skybrowser123",
  database: "dbmsproject",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/recipes", (req, res) => {
  const q = "SELECT * FROM recipes";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});


app.get("/recipes/:id", (req, res) => {
    const q = "SELECT * FROM recipes where recipieID = (?)";
    const id = req.params.id;
    db.query(q,[id], (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });

app.post("/recipes", (req, res) => {
  const q = "INSERT INTO recipes(`title`, `descp`, `price`) VALUES (?)";

  const values = [req.body.title, req.body.descp, req.body.price];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/recipes/:id", (req, res) => {
  const recipes = req.params.id;
  const q = " DELETE FROM recipes WHERE id = ? ";

  db.query(q, [recipes], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/recipes/:id", (req, res) => {
  const recipes = req.params.id;
  const q =
    "UPDATE recipes SET `title`= ?, `descp`= ?, `price`= ? WHERE id = ?";

  const values = [req.body.title, req.body.descp, req.body.price];

  db.query(q, [...values, recipes], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
