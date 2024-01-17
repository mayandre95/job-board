import mysql from 'mysql2';
import dotenv from 'dotenv';



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


const searchAdmin = async (req,res) => {
    const {search ,filter} = req.body
  
    var select =`SELECT * FROM advertisements WHERE ${filter} LIKE ?`                         
    connection.query(select,[`%${search}%`],(error,results)=>{
      if (error ){
        console.error('Warning searching error ' + error);
        return res.status(500).json({ error : 'Searching failed' });
      } else  {
        console.log(results); 
        res.json(results);
      }
    })
  
}

// const statAdmin = async(req,res) => {
//   var companies = 'SELECT * FROM companies'
//   var candidate = 'SELECT * FROM people'
//   var offer = 'SELECT * FROM advertisements'
//   var candidature = 'SELECT * FROM candidature'


//   connection.query(companies,(error,results) =>{
//     if (error) {return res.status(500).json({ error : 'Searching failed' })}
//     else  {console.log("it ok")  }
//   })
//   connection.query(candidate,(error,results) =>{
//     if (error) {return res.status(500).json({ error : 'Searching failed' })}
//     else  {console.log(results)}
//   })
  

//   return res.json(results);
  
// }
// const Nbr
// connection.query(offer,(error,results) =>{
//   if (error) {return res.status(500).json({ error : 'Searching failed' })}
//   else  {console.log(results)}
// })

// async function statAdmin(req, res) {
//   let nb_companies, nb_candidate, nb_offer;

//   const companiesQuery = 'SELECT * FROM companies;';
//   const candidateQuery = 'SELECT * FROM candidates;'; // Update with the correct table name
//   const offerQuery = 'SELECT * FROM offers;'; // Update with the correct table name


//   // const candidatureQuery = 'SELECT * FROM candidatures;'; // Update with the correct table name
//   connection.query(companiesQuery, (error, results) => {
//     if (error) {
//       return res.status(500).json({ error: 'Searching companies failed' });
//     } else {
//       nb_companies = results.length;
//       checkCompletion();
//     }
//   });

//   connection.query(candidateQuery, (error, results) => {
//     if (error) {
//       return res.status(500).json({ error: 'Searching candidates failed' });
//     } else {
//       nb_candidate = results.length;
//       checkCompletion();
//     }
//   });

//   connection.query(offerQuery, (error, results) => {
//     if (error) {
//       return res.status(500).json({ error: 'Searching offers failed' });
//     } else {
//       nb_offer = results.length;
//       checkCompletion();
//     }
//   });

//   function checkCompletion() {
//     // Check if all queries have completed
//     if (nb_companies !== undefined && nb_candidate !== undefined && nb_offer !== undefined) {
//       console.log('The lengths are:', nb_companies, nb_candidate, nb_offer);
//       res.json({ candidate: nb_candidate, companies: nb_companies, offer: nb_offer });
//     }
//   }
// }


export {searchAdmin}