const express = require('express');
const methodOverride = require('method-override');
const app = express();
const path = require('path'); //route
const { v4: uuid } = require('uuid');//for id


app.use(express.urlencoded({ extended: true })) //parse json
app.use(express.json()) 
app.use(methodOverride('_method')) //for post (put patch)

app.set('views', path.join(__dirname, 'views')) //for ejs
app.set('view engine','ejs')

let comments = [
    {   id:uuid(),
        username: 'Todd',
        comment: 'lol that is so fuuny!'
    },
    {   id:uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog!'
    },
    {   id:uuid(),
        username: 'Sk8erboi',
        comment: 'plz delete your accout, Todd!'
    },
    {   id:uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof!'
    }
];


app.get('/comments', (req,res)=>{
    res.render('comments/index',{comments});
})

app.get('/comments/new',(req,res)=>{
  res.render('comments/new');
})

app.post('/comments', (req,res) =>{
const {username, comment} = req.body;
    comments.push({username,comment, id:uuid()})
   
   res.redirect('/comments');
})

app.get('/comments/:id',(req, res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);//click id === route-id
    res.render('comments/show',{comment})

})
app.get('/comments/:id/edit', (req,res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);

    res.render('comments/edit',{comment}) 
})

app.patch('/comments/:id', (req,res)=>{
    const { id } = req.params;
    
    const newCommentText = req.body.comment;
    
    const foundComment = comments.find(c => c.id === id)
    
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

app.delete('/comments/:id',(req,res)=>{
    const { id } = req.params;
   comments = comments.filter(c => c.id !== id);
   res.redirect('/comments');
})

app.get('/tacos', (req, res) =>{
    res.send('Get /tacos response')
})
app.post('/tacos',(req,res) =>{
    const {meat,qty} = req.body;
    res.send(`Ok, here are your ${qty} ${meat} tacos.`)
})

app.listen(3000,()=>{
    console.log('on port 3000!')
})