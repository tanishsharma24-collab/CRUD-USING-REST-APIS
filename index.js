const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");//new unique id daga
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id : uuidv4(),
        username : "tanish",
        contant : "work hard for acchive the suscces"
    },
    {
         id : uuidv4(),
        username : "rahul",
        contant : "if yoy dont secrifies for your what you want , your what you want become sacrifies"
    }
    ,
    {
         id : uuidv4(),
        username : "me",
        contant : "hustle in the silace , let succes make the noice"
    },
 
];

// for show all the posts
app.get("/posts" , (req , res)=>
{
    res.render("index.ejs" , {posts});
})

// ek new post jo new.ejs(form) sa aayi hai use array mai add krna 
app.post("/posts" , (req , res) =>
{
    let {username , contant} = req.body;
    let id = uuidv4();
    posts.push({id , username , contant});
    res.redirect("/posts");//by defalt get req par hi jayagi
})

//new post add krna par form open hoga
app.get("/posts/new" , (req , res)=>
{
    res.render("new.ejs");
})

//ek indevisule post ko show krna(id ki post show kar do)
app.get("/posts/:id" , (req , res)=>
{
    let {id} = req.params;
    //id ka basis par post search krunga posts array mai
    let post = posts.find((p) => id == p.id);

    res.render("show.ejs" , {post});
})

//form sa jo content aaya hai usko updete krna
app.patch("/posts/:id" , (req, res)=>
{
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);

    let newcontant = req.body.contant;
    
    post.contant = newcontant;

    res.redirect("/posts");
})

//edit form 
app.get("/posts/:id/edit" , (req , res)=>
{
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs" , {post});
})

//delete the parteculer post
app.delete("/posts/:id" , (req , res)=>
{
    let {id} = req.params;

    posts = posts.filter((p) => id != p.id);

    res.redirect("/posts");
})


const port = 8080;
app.listen(port , ()=>
{
    console.log("app is listing on the port");
})