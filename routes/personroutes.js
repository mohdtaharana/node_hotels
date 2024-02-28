const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');


router.get('/profile', function (req, res) {
    res.send('This is profile');
  });
  
  router.get('/about', function (req, res) {``
    res.send('This is about us page');
  });
  
  router.get('/contact', function (req, res) {
    res.send('This is contact us page');
  });

  // post method
router.post('/', async function (req, res) {
    try {
    const data =  req.body;// assuming the req.body contains the person data
    const newPerson = new Person(data);//create a new person document using a mongoose model
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
    } catch (error) {
    console.log(error);
    res.status(400).json({error:"error is creating problem"});;
      
    }
    });
     // get method 
router.get('/', async (req,res)=>{
try {
  const data = await Person.find()
  console.log("data fetched");
res.status(200).json(data);

} catch (error) {
  console.log(error);
  res.status(400).json({error:"error is creating problem"});
}

})
// parameterized API
router.get('/:worktype',async (req,res)=>{
    try {
      const worktype = req.params.worktype;//extract the work type from url
      if (worktype == 'cheff'|| worktype =='waiter'|| worktype =='manager') {
        const response = await  Person.find({work:worktype});
        console.log("response fetched");
        res.status(200).json({response});
      } else {
        console.log("invalid worktype");
        res.status(400).json({error:"error is creating problem"});
      }
    } catch (error) {
        console.log(error);
      res.status(500).json({error:"internal server error"});}
    })
   
    // put method
    router.put("/:id", async(req,res)=>{
try {
    const personId = req.params.id;//extract the id from url parameter
const updatedpersondata = req.body;//updated data for person
const response = await Person.findByIdAndUpdate(personId,updatedpersondata,{
    new:true,
    runValidators:true
});
if (!response) {
return   response.status(404).json({error:"person not found"}) ; 
}
console.log("data updated");
res.status(200).json({response});
} catch (error) {
    console.log(error);
    res.status(500).json({error:"internal server error"});
}

    });
    //delete method
    router.delete('/:id', async (req, res) => {
        try {
            const personId = req.params.id;
            const response = await Person.findByIdAndDelete(personId);
    
            if (!response) {
                return res.status(404).json({ error: "Person not found" });
            }
    
            console.log("Data deleted");
            res.status(200).json({ message: "Deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
    
    
   module.exports = router;