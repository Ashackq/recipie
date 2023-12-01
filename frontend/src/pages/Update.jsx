import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const url = "http://localhost:1000/api/v1";

const Update = () => {
  const [teacher, setTeacher] = useState({
    years_of_experience: null,
    gender: "",
    name: "",
    email_id: "",
    specialization: "",
    location_id: null,
    division_id: null,
    course_id: null,
    department_id: null,
    roles_id: null,
    committee_id: null,
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const teacherId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/teachers/${teacherId}`);
        setTeacher(response.data.data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    fetchData();
  }, [teacherId]);

  const handleChange = (e) => {
    setTeacher((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(`${url}/teachers/${teacherId}`, {
        years_of_experience: teacher.years_of_experience,
        gender: teacher.gender,
        name: teacher.name,
        email_id: teacher.email_id,
      });

      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div style={styles.container} className="form">
      <h1 style={styles.heading}>Update Teacher</h1>
      <input
        type="number"
        placeholder="Years of Experience"
        name="years_of_experience"
        value={teacher.years_of_experience || ""}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Gender"
        name="gender"
        value={teacher.gender || ""}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={teacher.name || ""}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Email ID"
        name="email_id"
        value={teacher.email_id || ""}
        onChange={handleChange}
        style={styles.input}
      />
      {/* Add similar input fields for other properties */}
      <button onClick={handleClick} style={styles.button}>
        Update
      </button>
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
  input: {
    margin: "10px 0",
    padding: "8px",
    fontSize: "16px",
    width: "100%",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  link: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#3498db",
    textDecoration: "none",
  },
};

export default Update;
