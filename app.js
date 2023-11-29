//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
port = 3000
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://zelalem666:zelalem-888@cluster0.xqaksio.mongodb.net/todolist")
const todolistschema = {
  name:String
}
const item = mongoose.model("item", todolistschema)
const itemOne = new item({
  name: "WTF"
})
const itemTwo = new item({
  name: "ASAP"
})

const defaultItems = [itemOne, itemTwo]
const lists = {
  name: String,
  items: [todolistschema]
}
const List = mongoose.model('List', lists)




const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function(req, res) {
  item.find({}).then(function(innerItems){
    if( innerItems.length === 0){
      item.insertMany(defaultItems)
      res.redirect('/')
    }else{
      res.render("list", {listTitle: "today", newListItems: innerItems});
    }
  })
  const day = date.getDate();
  })


app.post("/", function(req, res){

  const newItem = req.body.newItem;
  const newList = req.body.list;

 const Items = new item({
  name: newItem
 })
 if(newList ==="today"){
   Items.save()
 res.redirect("/")
 }else{
  List.findOne({name:newList}).then(function(foundList){
    let ze = foundList.items
  ze.push(Items)
  foundList.save()
  res.redirect('/'+ newList)
})
 }




});


app.get('/:topic', function(req , res){
    const topicName = req.params.topic;
   
  List.findOne({name:topicName}).then(function(doc){
   
    if(!doc){
      const list = new List({
        name:topicName,
        items: defaultItems
      })
      list.save()
      res.redirect("/"+ topicName)

    }else{
      res.render('list',{listTitle:doc.name, newListItems: doc.items})
    }
   
  })

  
})



app.post('/delete', function(req , res){
  const idss =req.body.checkbox;
  item.findByIdAndDelete(idss).then(function(docs){
    console.log("Item deleted!");
  })
  res.redirect('/')
})


app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen( process.env.port||3000, function() {
  console.log("Server started on port 3000");
});
