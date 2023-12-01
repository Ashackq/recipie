import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const url = "http://localhost:1000/api/v1";

const Add = () => {
  const [teacher, setTeacher] = useState({
    years_of_experience: "",
    gender: "",
    name: "",
    email_id: "",
    specialization: "",
    location_id: "",
    division_id: "",
    course_id: "",
    department_id: "",
    roles_id: "",
    committee_id: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTeacher((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/teachers`, teacher);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Add New Teacher</h1>
      <form style={styles.form}>
        <input
          type="text"
          placeholder="Teacher Name"
          name="name"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Gender"
          name="gender"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Years of Experience"
          name="years_of_experience"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Email"
          name="email_id"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Specialization"
          name="specialization"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Location ID"
          name="location_id"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Division ID"
          name="division_id"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Course ID"
          name="course_id"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Department ID"
          name="department_id"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Roles ID"
          name="roles_id"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Committee ID"
          name="committee_id"
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={handleClick} style={styles.button}>
          Add
        </button>
      </form>
      {error && <p style={styles.error}>Something went wrong!</p>}
      <Link to="/" style={styles.link}>
        See all teachers
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    margin: "10px 0",
    padding: "8px",
    fontSize: "16px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  link: {
    marginTop: "20px",
    fontSize: "16px",
  },
};

export default Add;
