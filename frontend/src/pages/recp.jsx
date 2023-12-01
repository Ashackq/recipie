import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const url = "http://localhost:1000/api/v1";

const Recipes = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchAllTeachers = async () => {
      try {
        const res = await axios.get(`${url}/teachers`);
        setTeachers(res.data.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTeachers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/teachers/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Akash's Teachers Display</h1>
      <div style={styles.teachersContainer}>
        {teachers.map((teacher) => (
          <div key={teacher.teacher_id} style={styles.teacherCard}>
            <img src={teacher.cover} alt="Profile Pic" style={styles.image} />
            <h2>{teacher.name}</h2>
            <p>{teacher.specialization}</p>
            <p>Email: {teacher.email_id}</p>
            <p>Experience: {teacher.years_of_experience} years</p>
            <p>Teaching Division: {teacher.division_id}</p>
            <p>Teaches Course: {teacher.course_id}</p>
            <p>In Department: {teacher.department_id}</p>
            <p>Roles: {teacher.roles_id}</p>
            <p>In Committee: {teacher.committee_id}</p>
            <p>Location: {teacher.location_id}</p>

            <button
              style={styles.deleteButton}
              onClick={() => handleDelete(teacher.teacher_id)}
            >
              Delete
            </button>
            <button style={styles.updateButton}>
              <Link to={`/update/${teacher.teacher_id}`} style={styles.link}>
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button style={styles.addButton}>
        <Link to="/add" style={styles.link}>
          Add New Teacher
        </Link>
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  teachersContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  teacherCard: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    margin: "10px",
    padding: "15px",
    width: "300px",
    textAlign: "left",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  deleteButton: {
    backgroundColor: "#ff5757",
    color: "#fff",
    padding: "8px",
    marginRight: "5px",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "8px",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
  },
  addButton: {
    backgroundColor: "#2196F3",
    color: "#fff",
    padding: "10px",
    marginTop: "20px",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
};

export default Recipes;
