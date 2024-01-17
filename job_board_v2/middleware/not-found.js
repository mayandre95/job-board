
const notFoundMDW = (req,res) => {
 res.status('404').send({message :'Route no exist'})
}

export default notFoundMDW
