CREATE DATABASE job_board;

CREATE TABLE companies (
    id_company INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    mail VARCHAR(100) NOT NULL UNIQUE,
    place VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT NOW() NOT NULL
)

CREATE TABLE advertisements (
    id_adv INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    contract VARCHAR(50) NOT NULL,
    place VARCHAR(50) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT NOW() NOT NULL,
    id_company INT NOT NULL,
    salary INT(10) NULL,
    adventage VARCHAR(250) NULL,
    FOREIGN KEY (id_company) REFERENCES companies(id_company),
    UNIQUE (id_adv,id_company)
);

CREATE TABLE people(
    id_people INT AUTO_INCREMENT PRIMARY KEY,
    lname VARCHAR(100) NOT NULL,
    fname VARCHAR(100) NOT NULL,
    mail VARCHAR(100) NOT NULL UNIQUE,
    level_study VARCHAR(100),
    place VARCHAR(50) NOT NULL,
    date_of_birth INT(20) NOT NULL, 
    created_at DATETIME DEFAULT NOW() NOT NULL
);

CREATE TABLE keep_inf (
    id_people INT NOT NULL,
    id_adv INT NOT NULL,
    email_send TEXT,
    created_at DATETIME DEFAULT NOW() NOT NULL,
    FOREIGN KEY (id_adv) REFERENCES advertisements(id_adv),
    FOREIGN KEY (id_people) REFERENCES people(id_people),
    PRIMARY KEY (id_people,id_adv),
    UNIQUE (id_people,id_adv)
);