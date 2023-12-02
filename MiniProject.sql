  create database Projectl;
  USE Projectl;
  CREATE TABLE teachers (
    teacher_id INT PRIMARY KEY auto_increment,
    years_of_experience INT,
    gender VARCHAR(10),
    name VARCHAR(100),
    email_id VARCHAR(100),
    specialization VARCHAR(255),
    location_id INT,
    division_id INT,
    course_id INT,
    department_id INT,
    roles_id INT,
    committee_id INT
  );

  ALTER TABLE teachers AUTO_INCREMENT = 0;

  CREATE TABLE location (
    location_id INT PRIMARY KEY,
    building VARCHAR(100),
    room_number VARCHAR(10)
  );

  CREATE TABLE division (
    division_id INT PRIMARY KEY,
    year INT
  );
  CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    c_description VARCHAR(255),
    c_name VARCHAR(100)
  );
  CREATE TABLE department (
    department_id INT PRIMARY KEY,
    d_name VARCHAR(100)
  );
  CREATE TABLE roles (
    role_id INT PRIMARY KEY,
    description VARCHAR(255)
  );
  CREATE TABLE committee (
    committee_id INT PRIMARY KEY,
    com_description VARCHAR(255),
    com_name VARCHAR(100)
  );

  ALTER TABLE teachers
    ADD FOREIGN KEY (location_id) REFERENCES location(location_id),
    ADD FOREIGN KEY (division_id) REFERENCES division(division_id),
    ADD FOREIGN KEY (course_id) REFERENCES courses(course_id),
    ADD FOREIGN KEY (department_id) REFERENCES department(department_id),
    ADD FOREIGN KEY (roles_id) REFERENCES roles(role_id),
    ADD FOREIGN KEY (committee_id) REFERENCES committee(committee_id);

  -- Assuming each teacher can have multiple roles, you may need a junction table for a many-to-many relationship between teachers and roles.
  CREATE TABLE teacher_roles (
    teacher_id INT,
    role_id INT,
    PRIMARY KEY (teacher_id, role_id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
  );

  -- Similarly, if a teacher can be in multiple committees, create a junction table for the many-to-many relationship between teachers and committees.
  CREATE TABLE teacher_committees (
    teacher_id INT,
    committee_id INT,
    PRIMARY KEY (teacher_id, committee_id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id),
    FOREIGN KEY (committee_id) REFERENCES committee(committee_id)
  );

  -- Procedure to create a new teacher
  DELIMITER //

  CREATE PROCEDURE CreateTeacher(
    IN p_years_of_experience INT,
    IN p_gender VARCHAR(10),
    IN p_name VARCHAR(100),
    IN p_email_id VARCHAR(100),
    IN p_specialization VARCHAR(255),
    IN p_location_id INT,
    IN p_division_id INT,
    IN p_course_id INT,
    IN p_department_id INT,
    IN p_roles_id INT,
    IN p_committee_id INT
  )
  BEGIN
    INSERT INTO teachers (
      years_of_experience, gender, name, email_id, specialization,
      location_id, division_id, course_id, department_id, roles_id, committee_id
    ) VALUES (
      p_years_of_experience, p_gender, p_name, p_email_id, p_specialization,
      p_location_id, p_division_id, p_course_id, p_department_id, p_roles_id, p_committee_id
    );
  END //


  DELIMITER //

  CREATE PROCEDURE DeleteTeacher(
    IN p_teacher_id INT
  )
  BEGIN
    DELETE FROM teachers WHERE teacher_id = p_teacher_id;
  END //

  -- Procedure to update teacher information by ID
  DELIMITER //

  CREATE PROCEDURE UpdateTeacher(
    IN p_teacher_id INT,
    IN p_years_of_experience INT,
    IN p_gender VARCHAR(10),
    IN p_name VARCHAR(100),
    IN p_email_id VARCHAR(100),
    IN p_specialization VARCHAR(255),
    IN p_location_id INT,
    IN p_division_id INT,
    IN p_course_id INT,
    IN p_department_id INT,
    IN p_roles_id INT,
    IN p_committee_id INT
  )
  BEGIN
    UPDATE teachers SET
      years_of_experience = p_years_of_experience,
      gender = p_gender,
      name = p_name,
      email_id = p_email_id,
      specialization = p_specialization,
      location_id = p_location_id,
      division_id = p_division_id,
      course_id = p_course_id,
      department_id = p_department_id,
      roles_id = p_roles_id,
      committee_id = p_committee_id
    WHERE teacher_id = p_teacher_id;
  END //

  DELIMITER ;


  INSERT INTO location (location_id, building, room_number) VALUES
  (1, 'Building A', 'Room 101'),
  (2, 'Building B', 'Room 202'),
  (3, 'Building C', 'Room 303');

  INSERT INTO division (division_id, year) VALUES
  (1, 2022),
  (2, 2023),
  (3, 2024);

  INSERT INTO courses (course_id, c_description, c_name) VALUES
  (1, 'Introduction to Programming', 'CS101'),
  (2, 'Database Management', 'CS201'),
  (3, 'Web Development', 'CS301');

  INSERT INTO department (department_id, d_name) VALUES
  (1, 'Computer Science'),
  (2, 'Mathematics'),
  (3, 'Physics');

  INSERT INTO roles (role_id, description) VALUES
  (1, 'Teacher'),
  (2, 'Head of Department'),
  (3, 'Administrator');

  INSERT INTO committee (committee_id, com_description, com_name) VALUES
  (1, 'Education Committee', 'EduCom'),
  (2, 'Research Committee', 'ResCom'),
  (3, 'Events Committee', 'EventsCom');

  INSERT INTO teachers (
    years_of_experience,
    gender,
    name,
    email_id,
    specialization,
    location_id,
    division_id,
    course_id,
    department_id,
    roles_id,
    committee_id
  ) VALUES
  (5, 'Male', 'John Doe', 'john.doe@email.com', 'Physics', 1, 2, 1, 3, 1, 2),
  (8, 'Female', 'Jane Smith', 'jane.smith@email.com', 'Mathematics', 2, 1, 2, 1, 2, 1);


  select * from teachers;

