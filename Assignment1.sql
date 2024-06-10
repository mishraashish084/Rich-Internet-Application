CREATE DATABASE IF NOT EXISTS ExaminationReportingDB;
USE ExaminationReportingDB;
CREATE TABLE Student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(50) 
);
CREATE TABLE Lecturer (
    lecturer_id INT AUTO_INCREMENT PRIMARY KEY,
    lecturer_name VARCHAR(50) NOT NULL
);

CREATE TABLE Module (
    module_id INT AUTO_INCREMENT PRIMARY KEY,
    module_name VARCHAR(100) NOT NULL
);
CREATE TABLE Grade (
    grade_id INT AUTO_INCREMENT PRIMARY KEY,
    module_id INT NOT NULL,
    student_id INT NOT NULL,
    lecturer_id INT NOT NULL,
    grade DECIMAL(4, 2),
    FOREIGN KEY (module_id) REFERENCES Module(module_id),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (lecturer_id) REFERENCES Lecturer(lecturer_id)
);

CREATE TABLE Student_Module (
    student_id INT,
    module_id INT,
    PRIMARY KEY (student_id, module_id),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (module_id) REFERENCES Module(module_id)
);

CREATE TABLE Lecturer_Module (
    lecturer_id INT,
    module_id INT,
    PRIMARY KEY (lecturer_id, module_id),
    FOREIGN KEY (lecturer_id) REFERENCES Lecturer(lecturer_id),
    FOREIGN KEY (module_id) REFERENCES Module(module_id)
);
-- Stored Procedure to Assign Grade
DELIMITER //
CREATE PROCEDURE AssignGrade(
    IN module_id_param INT,
    IN student_id_param INT,
    IN lecturer_id_param INT,
    IN grade_param DECIMAL(4, 2)
)
BEGIN
    INSERT INTO Grade (module_id, student_id, lecturer_id, grade)
    VALUES (module_id_param, student_id_param, lecturer_id_param, grade_param);
END //
DELIMITER ;
CALL AssignGrade(3, 4, 3, 81.00);
SELECT * FROM Student_Grades;
SELECT * FROM Student_Module WHERE module_id = 1;
SELECT * FROM Student_Grades WHERE student_id = 1;


-- Create View for Student's Grades
CREATE VIEW Student_Grades AS
SELECT Module.module_id, Module.module_name, Grade.grade
FROM Module
JOIN Grade ON Module.module_id = Grade.module_id
JOIN Student ON Grade.student_id = Student.student_id;

INSERT INTO Student (student_name) VALUES ('Amit'), ('Varun'), ('sumit');
select *from student;
INSERT INTO Lecturer (lecturer_name) VALUES ('Dr. Declan'), ('Prof. sameer');
select *from Lecturer;
INSERT INTO Module (module_name) VALUES ('Geography'), ('History');
select *from Module;
INSERT INTO Student_Module (student_id, module_id) VALUES (1, 1), (2, 1), (3, 2);
INSERT INTO Lecturer_Module (lecturer_id, module_id) VALUES (1, 1), (2, 2);
select *from Student_Module;
select *from Lecturer_Module;
INSERT INTO Grade (module_id, student_id, lecturer_id, grade) VALUES (1, 1, 1, 85.0), (1, 2, 1, 78.5), (2, 3, 2, 92.3);
select *from Grade;
select *from Student_Grades
