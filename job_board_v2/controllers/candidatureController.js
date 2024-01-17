import mysql from 'mysql2';


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


const createCandidature = async(req,res) => {
    
    const {email_company,email_candidate, email_send, salary, advantage,place,idCompany} = req.body

    var id_company = parseInt(idCompany)

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

const getAllCandidature = async (req,res) => {
    connection.query('SELECT * from candidature', (error, results) => {
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

export {createJob,  deleteJob, getAllJobs, updateJob}