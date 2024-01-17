import { error, log } from 'console';
import mysql from 'mysql2';
import fs, { link } from 'fs';
import path from 'path';

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


const createJob = async(req,res) => {
    
    const {title, contract, description, salary, advantage,place,idCompany} = req.body

    console.log(idCompany)
    var id_company = parseInt(idCompany)
    console.log(id_company)
    console.log(req.body)

    //Checking  that title, contract, description are fill up
    if (!title || !contract || !description){
        return res.status(400).json({ error: 'Please fill in the title, contract, description fields.' });
    }
    
    connection.query('INSERT INTO advertisements (title, contract, description, salary, advantage,id_company,place) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, contract, description, salary,advantage,id_company,place], (error,results)=>{
        if (error) {
            console.error('Error when creating the warning : ' + error);
            return res.status(500).json({ error: 'Error when creating the warning :' });
        }
        return res.status(201).json({ message: 'Warning successfully created' });
    })
}

const getAllJobs = async (req,res) => {
    connection.query('SELECT a.*, c.name AS company FROM advertisements a JOIN companies c ON a.id_company = c.id_company;', (error, results) => {
        if (error) {
            console.error('Error executing SELECT query:', error);
            return res.status(500).json({ error: 'An error occurred.' });
        } else  {
            console.log(results); 
            res.json(results);}
    })


}

const deleteJob = async (req, res) => {
    console.log(req.body)
    const {id_adv} = req.body
    console.log(id_adv)
    
  
    connection.query('DELETE FROM advertisements WHERE id_adv = ?',
        [id_adv],
        (error, results) => {
            if (error) {
                console.error('Error when deleting the job: ' + error);
                return res.status(500).json({ error: 'Error when deleting the job' });
            }
            return res.status(200).json({ message: 'Job successfully deleted' });
        }
    );
};


const updateJob = async (req, res) => {
    const { title, contract, description, salary,advantage,place, id_adv } = req.body;
    console.log(req.body)
    console.log (title)
  
   


    connection.query(
        `UPDATE advertisements SET title = ?, contract = ?, description = ?, salary = ?, advantage = ?, place = ? WHERE id_adv = ?`,
        [title, contract, description, salary,advantage,place, id_adv],
        (error, results) => {
            if (error) {
                console.error('Error when updating the job: ' + error);
                return res.status(500).json({ error: 'Error when updating the job' });
            }
            return res.status(200).json({ message: 'Job successfully updated' });
            
        }
    );
};

const applyJob = async (req,res) => {
    const {id_adv, id_people, email, message, }= req.body
    

    //récupération de l'id_company à partire de l'id_adv pour renvoyer un message à l'entreprise

    //ajout du pdf
//     const CV = path.join(__dirname, 'CV_2023-10-12_André_Mayala.pdf');

//   if (fs.existsSync(filePath)) {
//     const fileContent = fs.readFileSync(filePath, 'utf8');
//     // Handle the file content here
//     res.send('File content: ' + fileContent);
//   } else {
//     res.status(404).send('File not found');
//   }

    // const CV = fs.readFileSync(CV_path);

    if (!message || !email){
        return res.status(400).json({ error: 'Please fill in the email and message fields .' });
    }
    //récupération de l'id_people à partire du mail ou de l'autentification
     connection.query('SELECT id_people FROM people WHERE email = ?', [email], (error,results)=>{
        if (error) {
            console.error('Error when creating the warning : ' + error);
            return res.status(500).json({ error: 'user does not exist :' });
        }
        if (!results.length) {
            return res.status(404).json({ error: 'Email not found in the database.' });
          }
          const id_people = results[0].id_people;
          console.log("In the function ",id_people)
          console.log(typeof id_people)
          connection.query('INSERT INTO candidature (message, id_people, id_adv) VALUES (?, ?, ?)',
          [message, id_people, id_adv], (error,results)=>{
              if (error) {
                  console.error('Error when creating the warning : ' + error);
                  return res.status(500).json({ error: 'Error when applying :' });
              }
              return res.status(201).json({ message: 'Apply successfully created' });
          })
     })
    // si pas de mail retourner "vous n'êtes pas inscrit" et/ou rediriger vers la page d'inscription
    console.log("Out the function ",id_people)
    console.log(typeof id_people)

}

export {createJob,  deleteJob, getAllJobs, updateJob, applyJob}