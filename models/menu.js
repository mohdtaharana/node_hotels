const { default: mongoose } = require("mongoose");

const menuschema = mongoose.Schema({
    dishname:{
        type:String,
        required:true
    },
   Taste:{
    type:String,
    required:true,
    enum:["sour",'sweet','salty']
   },
   type:{
    type:String,
    required:true,
   }
   
});

const menu = mongoose.model('menu',menuschema);
module.exports = menu;