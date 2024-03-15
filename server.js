const express = require('express');
const app = express();
app.use(express.json());


app.listen(8000, () => {
  console.log('Server is up');
});

let contacts= [
 {
  id : "1",
  name: "Jannat"
 }
]

app.get('/contact',(req,res) =>{
 res.send ({
  success: true,
  message: "data fatched successfully",
  data:contacts
 });
});

app.post('/contact', (req,res)=>{
 let name = req.body.name;

 if(name){
  
 contacts.push({
  id:(contacts.length +1).toString(),
  name:name
 });
 res.send({
  success: true,
  message: "data is added successfully",
 });
  
 }
 else{
  res.send({
  success: false,
  message: "Validation error",
  error:[
   {
    field: "name",
    message:"Can not be Null"
   }
  ]
 });
 }


});
app.delete('/contact/:id',(req,res) =>{
 let id = req.params.id;
 let newContacts= contacts.filter(el => el.id != id)
 contacts= newContacts;

 res.send({
  success: true,
  message: "data  deleted successfully",

 });
});


app.put('/contact/:id',(req,res) =>{
  let id = req.params.id;
 let name = req.body.name;

 let index = contacts.findIndex(el => el.id != id);

 if (name){
  contacts[index] = {
 ...contacts[index],
 name : name
 }
  res.send ({
   success: true,
  message: "data updated successfully",
  });

 }
 else{
  res.send({
  success: false,
  message: "Validation error",
  error:[
   {
    field: "name",
    message:"Can not be Null"
   }
  ]
 });
 }

 
});
