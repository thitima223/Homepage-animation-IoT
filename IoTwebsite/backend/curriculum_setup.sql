-- Curriculum Tables Setup
CREATE TABLE IF NOT EXISTS curriculum_iot (
    id VARCHAR(50) NOT NULL,
    curriculum_year VARCHAR(10) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    `col` INT NOT NULL,
    `row` INT NOT NULL,
    `row_span` INT,
    class_name VARCHAR(100),
    `mobile_col` INT,
    `mobile_row` INT,
    `mobile_col_span` INT,
    `mobile_row_span` INT,
    PRIMARY KEY (id, curriculum_year)
);

CREATE TABLE IF NOT EXISTS curriculum_physiot (
    id VARCHAR(50) NOT NULL,
    curriculum_year VARCHAR(10) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    `col` INT NOT NULL,
    `row` INT NOT NULL,
    `row_span` INT,
    class_name VARCHAR(100),
    `mobile_col` INT,
    `mobile_row` INT,
    `mobile_col_span` INT,
    `mobile_row_span` INT,
    PRIMARY KEY (id, curriculum_year)
);

CREATE TABLE IF NOT EXISTS curriculum_continue (
    id VARCHAR(50) NOT NULL,
    curriculum_year VARCHAR(10) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    `col` INT NOT NULL,
    `row` INT NOT NULL,
    `row_span` INT,
    class_name VARCHAR(100),
    `mobile_col` INT,
    `mobile_row` INT,
    `mobile_col_span` INT,
    `mobile_row_span` INT,
    PRIMARY KEY (id, curriculum_year)
);

-- Insert IoT Data 2565
INSERT INTO curriculum_iot (id, curriculum_year, name, description, `col`, `row`, `mobile_col`, `mobile_row`) VALUES
('appsoft', '2565', 'App Software for Business', 'Learn fundamental application software used in modern business environments, including spreadsheets, databases, and presentation tools.', 1, 1, 1, 1),
('circuit', '2565', 'Circuit and Electronics', 'Introduction to basic circuit theory, components, and electronic devices. Includes DC/AC analysis and laboratory experiments.', 1, 2, 2, 1),
('eng1', '2565', 'Foundation English 1', 'Focuses on developing essential English language skills for academic and professional communication.', 1, 3, 5, 1),
('intro_iot', '2565', 'Introduction to IoT', 'A comprehensive overview of the Internet of Things (IoT) ecosystem, from sensors and connectivity to cloud data processing and applications.', 1, 4, 6, 1),
('cal1', '2565', 'Calculus 1', NULL, 1, 5, 1, 2),
('comprog', '2565', 'Computer Program', NULL, 1, 6, 2, 2),
('gen1', '2565', 'Gen Physics 1', NULL, 1, 7, 5, 2),
('gplab1', '2565', 'Gen Physics Lab 1', NULL, 1, 8, 6, 2),
('cal2', '2565', 'Calculus 2', NULL, 2, 1, 1, 1),
('oop', '2565', 'Object-Oriented Data Structure', NULL, 2, 2, 2, 1),
('digi', '2565', 'Fundamental Digital System', NULL, 2, 3, 3, 1),
('eng2', '2565', 'Foundation English 2', NULL, 2, 4, 4, 1),
('gen2', '2565', 'Gen Physics 2', NULL, 2, 5, 5, 1),
('gplab2', '2565', 'General Physics Lab 2', NULL, 2, 6, 6, 1),
('preact', '2565', 'Pre-Activities For Engineers', NULL, 2, 7, 2, 2),
('charm', '2565', 'Charm School', NULL, 2, 8, 4, 2),
('team1', '2565', 'Team Project 1', NULL, 2, 9, 6, 2),
('ode', '2565', 'ODE and Linear Algebra', NULL, 3, 1, 1, 1),
('stat', '2565', 'Engineering Statistics', NULL, 3, 2, 2, 1),
('micro', '2565', 'MCU and Embedded', NULL, 3, 3, 3, 1),
('cyber', '2565', 'CPS & Sensors', NULL, 3, 4, 3, 2),
('digicit', '2565', 'Digital Citizen', NULL, 3, 5, 4, 2),
('em', '2565', 'Electromagnetic Fields', NULL, 3, 6, 5, 1),
('comm', '2565', 'Principles of Communicate', NULL, 3, 7, 6, 1),
('disc', '2565', 'Discrete Mathematics', NULL, 4, 1, 1, 1),
('inter', '2565', 'Interaction Design', NULL, 4, 2, 2, 1),
('web', '2565', 'Web and Mobile App Development', NULL, 4, 3, 3, 1),
('team2', '2565', 'Team Project 2', NULL, 4, 4, 4, 1),
('sec', '2565', 'Cyber Security', NULL, 4, 5, 5, 1),
('iotcomm', '2565', 'IoT and Data Communicate', NULL, 4, 6, 6, 1),
('gened1', '2565', 'Gen-Ed', NULL, 4, 7, 2, 2),
('genedlang1', '2565', 'Gen-Ed (LANG)', NULL, 4, 8, 3, 2),
('mathds', '2565', 'Math Data Science', NULL, 5, 1, 1, 1),
('ai', '2565', 'Artificial Intelligence', NULL, 5, 2, 2, 1),
('major1', '2565', 'MAJOR ELECTIVE 1', NULL, 5, 3, 3, 1),
('major2', '2565', 'MAJOR ELECTIVE 2', NULL, 5, 4, 4, 1),
('sem', '2565', 'SEMINAR', NULL, 5, 5, 5, 1),
('iotlab1', '2565', 'IoT & Info Lab 1', NULL, 5, 6, 6, 1),
('gened2', '2565', 'Gen-Ed', NULL, 5, 7, 1, 2),
('iiot', '2565', 'Industrial Internet of Things', NULL, 6, 1, 1, 1),
('major3', '2565', 'MAJOR ELECTIVE 3', NULL, 6, 2, 2, 1),
('iotlab2', '2565', 'IoT & Info Lab 2', NULL, 6, 3, 3, 1),
('team3', '2565', 'Team Project 3', NULL, 6, 4, 4, 1),
('gened3', '2565', 'Gen-Ed', NULL, 6, 5, 5, 1);

-- Special Cases with RowSpan and ClassName
INSERT INTO curriculum_iot (id, curriculum_year, name, `col`, `row`, `mobile_col`, `mobile_row`, `mobile_col_span`, class_name) VALUES
('proj1', '2565', 'Project 1', 7, 1, 1, 1, 2, 'course-pill-outline'),
('iotele1', '2565', 'IoT Elective 1', 7, 2, 3, 1, 2, 'course-pill-outline'),
('free1', '2565', 'Free Elective 1', 7, 3, 1, 2, 2, 'course-pill-outline'),
('iotele2', '2565', 'IoT Elective 2', 7, 4, 3, 2, 2, 'course-pill-outline');

INSERT INTO curriculum_iot (id, curriculum_year, name, `col`, `row`, `row_span`, `mobile_col`, `mobile_row`, `mobile_col_span`, `mobile_row_span`, class_name) VALUES
('coop', '2565', 'Co-Operative / Study Abroad', 7, 6, 3, 5, 1, 2, 2, 'course-pill-coop');

INSERT INTO curriculum_iot (id, curriculum_year, name, `col`, `row`, `mobile_col`, `mobile_row`) VALUES
('proj2_1', '2565', 'Project 2', 8, 1, 1, 1),
('iotele3', '2565', 'IoT Elective 3', 8, 2, 2, 1),
('free2', '2565', 'Free Elective 2', 8, 3, 3, 1),
('proj2_2', '2565', 'Project 2', 8, 6, 1, 1),
('proj2_3', '2565', 'Project 2', 8, 7, 2, 1),
('proj2_4', '2565', 'Project 2', 8, 8, 3, 1),
('proj2_5', '2565', 'Project 2', 8, 9, 4, 1),
('proj2_6', '2565', 'Project 2', 8, 10, 5, 1);

-- 2568 Data
INSERT INTO curriculum_iot (id, curriculum_year, name, `col`, `row`, `mobile_col`, `mobile_row`) VALUES
('appsoft-68', '2568', 'App Software for Business (2568)', 1, 1, 1, 1),
('cal1-68', '2568', 'Calculus 1 (2568)', 1, 2, 2, 1),
('digi-68', '2568', 'Fundamental Digital System (2568)', 2, 1, 1, 1);

-- Copy to other tables as initial state
INSERT INTO curriculum_physiot SELECT * FROM curriculum_iot;
INSERT INTO curriculum_continue SELECT * FROM curriculum_iot;
