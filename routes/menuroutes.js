const express = require('express');
const router = express.Router();
const menu = require('./../models/menu');




  // post method
router.post('/', async function (req, res) {
    try {
    const data =  req.body;// assuming the req.body contains the person data
    const newMenu = new menu(data);//create a new menu document using a mongoose model
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
    } catch (error) {
    console.log(error);
      
    }
    });
     // get method 
router.get('/', async (req,res)=>{
try {
  const data = await menu.find()
  console.log("data fetched");
res.status(200).json(data);

} catch (error) {
  console.log(error);
}

})
// parameterized API
router.get('/:taste',async (req,res)=>{
    try {
      const taste = req.params.taste;//extract the work type from url
      if (taste == 'sour'|| taste =='sweet'|| taste =='salty') {
        const response = await  menu.find({Taste:taste});
        console.log("response fetched");
        res.status(200).json({response});
      } else {
        console.log("invalid worktype");
        res.status(200).json({error:"error is creating problem"});
      }
    } catch (error) {
      res.status(500).json({error:"internal server error"});}
    })
   
    
   module.exports = router;