import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


//Get the key 
dotenv.config()
const secretKey = process.env.SECRET_KEY


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'anaxir',
    password: 'maco',
    database: 'job_board', 
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

//For check the email
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

//For the siret check

const siretCheck = /^[0-9]{14}$/;

//For phone number check

const phoneCheck = /^[0-9]{10}$/;

//For the birthday check
// const birthdayCheck = /^[0-9]+/+[0-9]+/[0-9]{10}$/;


/////REGISTER
const register = async (req, res) => {
    const {lname, fname, email, password, place,siret, date_of_birth, phone ,role} = req.body
    console.log(lname, fname, email, password, place,siret, date_of_birth, phone ,role)
  console.log(req.body)

  //Register a company or a candidate
  let table = ""
  if (role === 2){ table ="companies" } else if(role === 1) { table = "people"}
  var select = `SELECT * FROM ${table} WHERE email = ?`
  console.log("Select",select)
  console.log("Table",table)
  //check if all the fields have been filled
  if (table=== "people") {
    if (!lname || !date_of_birth) {
    return res.status(400).json({ error: 'Please fill in all fields.' });
    }
  }

  if(table === "companies"){
    if (!siret){
      console.log("Error siret vide")
      return res.status(400).json({ error: 'Please fill in all fields.' });  
    } else {console.log("siret non vide ok")}

     //Checking if the siret is correct
  if (!siretCheck.test(siret)) {
    console.log("Error siret debut")
    return res.status(400).json({ error: 'Siret number not valid'});
  }else {console.log("siret ok")}

  }

  if (!fname || !email || !password || !place || !phone){
    console.log("Error fname email password vide")
   return res.status(400).json({ error: 'Please fill in all fields.' });
  } else {console.log("donnée non vide ok")}

   //Hashing password
   var hashPassword = bcrypt.hashSync(password,10)
  

  //Checking if the mail is correct
    if (!emailRegex.test(email)) {
    console.log("Error email debut")
    return res.status(400).json({ error: 'Email address not valid' });
    } else {console.log("email ok")}
 
  //Checking if phone number is correct
  if (!phoneCheck.test(phone)) {
    console.log("Error numero debut")
    return res.status(400).json({ error: 'Phone number not valid'});
  } else {console.log("numero ok")}
  //Check if the mail already existe and if not insert the data ino the database
  connection.query(select, [email], (error, results, fields) => {
    if (error) {
      console.error('Error executing SELECT query:', error);
      return res.status(500).json({ error: 'An error occurred.' });
    }else {console.log("Pas d'erreur pour le mail ok")}

    if (results.length > 0) {
      console.log("Mail déjà présent :",error)
      return res.status(400).json({ error: 'User already exists.' });
    } else {console.log("email unique ok")}


    if (table === "companies") {
      connection.query(
        'INSERT INTO companies (name, email, password, place, siret, phone, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [fname, email, password,place, siret, phone, role],
        (error, results) => {
          if (error) {
            console.error('Error executing INSERT query:', error);
            return res.status(500).json({ message: 'Registration failed.' });
          } else {console.log("Pas d'error pour insert into ok")}
          res.status(201).json({ message: 'Registration succeed.' });
        }
      );
    }else {
      connection.query(
        'INSERT INTO people (fname,lname, email, password, place, role, phone, date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [fname, lname, email, hashPassword,place,role, phone, date_of_birth],
        (error, results) => {
          if (error) {
            console.error('Error executing INSERT query:', error);
            return res.status(500).json({ error: 'Registration failed.' });
          }
          console.log("Error  debut",error)
          res.status(201).json({ message : 'Registration succeed.' });
        }
      );
    }
  }); 
}




const login = async (req,res) => {
  const {email, password,isCompany} = req.body
  console.log(email)

  if (!email || !password){
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email address not valid' });
  } 

  var select = ''
  var select_2 = ''
  var id = ""
  var username = ""
  

  if (isCompany === true) {
    select = 'SELECT password FROM companies WHERE email = ?';
    select_2 = 'SELECT id_company, name, role FROM companies WHERE email = ?';
    id = 'id_company'; 
    username = 'name';
  } else {
    select = 'SELECT password FROM people WHERE email = ?';
    select_2 = 'SELECT id_people, fname, role FROM people WHERE email = ?';
    id = 'id_people'; 
    username = 'fname';
  }
  
  
  connection.query(select, [email], (error, results) => {
    if(error){
      console.error('Error executing SELECT query:', error);
      return res.status(500).json({ error: 'Login failed.' });
    }
    if(results.length === 0){
      return res.status(500).json({ error: 'Email not unknown' });
    }
    console.log(results)
    bcrypt.compare(password,results[0]['password'],(Berror,Bresults)=>{
      if (Berror){
        console.error('Error decrypting the password:', error);
      }
      if(Bresults){
        connection.query(select_2,[email],(error,results)=>{
        const token = jwt.sign({userId : results[0][`${id}`],userName : results[0][`${username}`], role :results[0]['role']},secretKey,{ expiresIn: '4h' })
        console.log(token);console.log(results[0][`${id}`])
        return res.status(200).json({message: 'Logged in!',token: token,}
        )
        });
      } else {return res.status(500).json({ error: 'Password incorrect' });}

    })
    
  })
}

const getAllDataUser = async (req,res) => {
  const {userId,role} =  req.body

  if (role === 1){var table ="people"; var id = "id_people"}
  if (role === 2){var table ="companies"; var id = "id_company"}
  if (role === 3){var table ="admin"; var id = "id_admin"}

  var select = `SELECT * FROM ${table} WHERE ${id}=? `
  connection.query(select, [userId], (error, results) => {
      if (error) {
          console.error('Error executing SELECT query:', error);
          return res.status(500).json({ error: 'Not succeed to retrieve de data.' });
      } else  {
          console.log(results); 
          res.json(results);}
  })
}







const updateUser = async (req,res) => {
  console.log(req.id)
  console.log(req.body)
  if(!req.id){return res.status(500).json({message : "Failed to retrieve id from body"})}
  if (role === 1){
    connection.query ('UPDATE people SET lname=? fname=? email=? password=? level_study=? WHERE id_people =?',
    [lname,fname,email,password,level_study,req.id],(error,res)=>{
      if (error) {
        console.error('Warning update error ' + error);
        return res.status(500).json({ error: 'Updating profile failed' });
    }
    return res.status(200).json({ message: 'Warning successfully updated' });
    })
  } else if (role === 2){
    connection.query ('UPDATE company SET fname=? email=? password=? WHERE id_company =?',
    [fname,email,password,req.id],(error,res)=>{
      if (error) {
        console.error('Warning update error ' + error);
        return res.status(500).json({ error: 'Updating profile failed' });
    }
    return res.status(200).json({ message: 'Warning successfully updated' });
    })
  }else if (role === 3){
    connection.query ('UPDATE admin SET lname=? fname=? email=? password=? WHERE id_admin =?',
    [lname,fname,email,password,req.id],(error,res)=>{
      if (error) {
        console.error('Warning update error ' + error);
        return res.status(500).json({ error : 'Updating profile failed' });
    }
    return res.status(200).json({ message: 'Updating profile succeed.' });
    })
  }
  


  res.send('update user')
}

//AND SELECT * FROM candidature WHERE * LIKE ?

const searchJob = async (req,res) => {
  const {search} = req.body

  var columns_ad =[title,description,place,salary,advantage,contract]
  var select =`SELECT * FROM advertisements WHERE ${columns_ad.map (col => `${col} LIKE ?`.JOIN(OR))}`    

                
  const selectParams = [
    ...columns_ad.map(col => `%${search}%`),
  ];             

  connection.query(select,selectParams,(error,results)=>{
    if (error ){
      console.error('Warning searching error ' + error);
      return res.status(500).json({ error : 'Searching failed' });
    } else  {
      console.log(results); 
      res.json(results);
    }
  })

}

const getAllCompanies = async (req,res) => {
  connection.query(`SELECT * FROM companies;`, (error, results) => {
      if (error) {
          console.error('Error executing SELECT query:', error);
          return res.status(500).json({ error: 'An error occurred.' });
      } else  {
          console.log(results); 
          res.json(results);}
  })
}

const getAllCandidate = async (req,res) => {
  connection.query(`SELECT * FROM people;`, (error, results) => {
      if (error) {
          console.error('Error executing SELECT query:', error);
          return res.status(500).json({ error: 'An error occurred.' });
      } else  {
          console.log(results); 
          res.json(results);}
  })
}


export { register, login, updateUser, getAllDataUser, getAllCandidate, getAllCompanies}