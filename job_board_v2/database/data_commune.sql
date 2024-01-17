CREATE DATABASE job_board;
USE job-board;
CREATE TABLE role (
  id_role INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50)
);
CREATE TABLE companies (
  id_company INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(100) NOT NULL, 
  email VARCHAR(100) NOT NULL, 
  phone VARCHAR(10) NOT NULL, 
  place VARCHAR(50) NOT NULL, 
  created_at DATETIME DEFAULT NOW() NOT NULL, 
  siret BIGINT NOT NULL UNIQUE, 
  password VARCHAR (250) NOT NULL,
  role int NOT NULL,
  FOREIGN KEY (role) REFERENCES role(id_role)
);


CREATE TABLE advertisements (
  id_adv INT AUTO_INCREMENT PRIMARY KEY, 
  title VARCHAR(100) NOT NULL, 
  contract VARCHAR(100) NOT NULL, 
  place VARCHAR(50) NOT NULL,
  description TEXT,
  salary INT(10),
  advantage TEXT,
  created_at DATETIME DEFAULT NOW() NOT NULL, 
  id_company INT NOT NULL, 
  FOREIGN KEY (id_company) REFERENCES companies(id_company)
);

DELIMITER / / CREATE TRIGGER set_default_value BEFORE INSERT ON advertisements FOR EACH ROW BEGIN SET NEW.place = (SELECT place FROM companies WHERE id = company_id);END;/ / DELIMITER;
CREATE TABLE people (
  id_people INT AUTO_INCREMENT PRIMARY KEY,
  lname VARCHAR(100) NOT NULL,
  fname VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  level_study VARCHAR(100) NULL,
  place VARCHAR(50) NOT NULL,
  created_at DATETIME DEFAULT NOW() NOT NULL,
  date_of_birth VARCHAR(15) NOT NULL,
  password VARCHAR (250) NOT NULL,
  role INT NOT NULL,
  FOREIGN KEY (role) REFERENCES role (id_role)
);


CREATE TABLE candidature(
  id_people INT NOT NULL,
  id_adv INT NOT NULL,
  CV TEXT NULL, 
  message TEXT,
  created_at DATETIME DEFAULT NOW() NOT NULL,
  FOREIGN KEY (id_adv) REFERENCES advertisements(id_adv), 
  FOREIGN KEY (id_people) REFERENCES people(id_people), 
  PRIMARY KEY (id_people, id_adv)
);

--CREATE Admin table

CREATE TABLE admin (
  id_admin INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fname VARCHAR(50),
  lname VARCHAR(50),
  email VARCHAR(250) UNIQUE,
  role INT,
  FOREIGN KEY (role) REFERENCES role(id_role)
);



--Insert the role in the role table
INSERT INTO
  role (name)
VALUES
  ('candidate');
INSERT INTO
  role (name)
VALUES
  ('company');
INSERT INTO
  role (name)
VALUES
  ('admin');

--Add the role to the companies tables
-- ALTER TABLE companies
-- ADD COLUMN role int NOT NULL;
-- SET FOREIGN_KEY_CHECKS = 0;
-- ALTER TABLE companies
-- ADD FOREIGN KEY (role) REFERENCES role(id_role);
UPDATE
  companies
SET role = 2;

--Add the role to the people tables
ALTER TABLE people
ADD COLUMN role int NOT NULL;
SET FOREIGN_KEY_CHECKS = 0;
ALTER TABLE people
ADD FOREIGN KEY (role) REFERENCES role(id_role);
UPDATE
  people
SET role = 1;

--Add the role to the admin tables
ALTER TABLE admin
ADD COLUMN role int NOT NULL;
SET FOREIGN_KEY_CHECKS = 0;
ALTER TABLE admin
ADD FOREIGN KEY (role) REFERENCES role(id_role);
UPDAT admin
SET role = 3;


--Creation of comapnies
INSERT INTO
  companies(name, mail, place)
VALUES
  (
    'TOTAL'
    , 'total-recrutement@total.eu'
    , '9 rue de la paix montreuil'
  );
INSERT INTO
  companies(name, mail, place)
VALUES
  (
    'Capi'
    , 'capi-recrutement@capi.eu'
    , '23 rue de la paix montreuil'
  );

--Creation of ad for Total
INSERT INTO
  advertisments (name, contrat, place, description, id_company)
VALUES
  (
    'Developpeur WEB'
    , 'CDD'
    , '78 rue de la paix montreuil'
    , 1
  );
INSERT INTO
  advertisments (name, contrat, place, description, id_company)
VALUES
  (
    'Data analyste'
    , 'CDI'
    , '38 rue de la paix montreuil'
    , 1
  );

--Creation of ad for Capi
INSERT INTO
  advertisments (name, contrat, place, description, id_company)
VALUES
  (
    'Ingenieur Logicielle'
    , 'CDD'
    , '78 rue de la paix montreuil'
    , 2
  );
INSERT INTO
  advertisments (name, contrat, place, description, id_company)
VALUES
  (
    'Ingenieur Cyber-sércurité'
    , 'Alternance'
    , '38 rue de la paix montreuil'
    , 2
  );

--Creation of a people
INSERT INTO
  people (lname, fname, email, level_study, place)
VALUES
  (
    'Radin'
    , 'Axel'
    , 'axelradin@gmail.com'
    , 'master'
    , '9 rue de la desaix Paris'
  );
INSERT INTO
  people (lname, fname, email, level_study, place)
VALUES
  (
    'Mayala'
    , 'Andre'
    , 'mayandre@gmail.com'
    , 'master'
    , '27 rue de la paix Montreuil'
  );

--Creation of keep_inf

--Allow to create a default place (the place of the company associate) for the advertisment when none have been set
DELIMITER / / CREATE TRIGGER set_default_value
BEFORE INSERT
ON advertisements
FOR EACH ROW
BEGIN
  SET NEW.place = (
    SELECT
      place
    FROM
      companies
    WHERE
      id = company_id
  ); --test
END;
/ / DELIMITER;