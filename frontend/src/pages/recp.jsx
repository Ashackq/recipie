import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Recipes = () => {
  const [recipes, setrecipes] = useState([]);

  useEffect(() => {
    const fetchAllrecipes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/recipes");
        setrecipes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllrecipes();
  }, []);

  console.log(recipes);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/recipes/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Akash Recipie Shop</h1>
      <div className="recipes">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="book">
            <img src={recipe.cover} alt="cover here" />
            <h2>{recipe.title}</h2>
            <p>{recipe.desc}</p>
            <span>${recipe.price}</span>
            <button className="delete" onClick={() => handleDelete(recipe.id)}>
              Delete
            </button>
            <button className="update">
              <Link
                to={`/update/${recipe.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new recipe
        </Link>
      </button>
    </div>
  );
};

export default Recipes;
