const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

let posts = [];
let id = 0

app.get("/posts/new", (req, res) => {
    res.render("newPost");
});

app.post("/posts/new", (req, res) => {
    const post = {
        id: id+1,
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post); 
    res.redirect("/");
});

app.get("/", (req, res) => {
    res.render("index", { posts: posts });
});

app.get("/posts/:id/edit", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render("editPost", { post: post });
});

app.post("/posts/:id/edit", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
    }
    res.redirect("/");
});
app.get("/post/:id", (req,res)=>{

    const id = req.params.id;

    posts.forEach(post=>{
        if(post.id = id){
            res.render("Test", {title: post.title, content: post.content})
        }
    })
  
});

app.post("/posts/:id/delete", (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server running ");
});
