const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const db = knex({
        client: 'pg',
        connection: {
          host : '127.0.0.1',
          user : '',
          password : '',
          database : 'myapp'
        }
      });


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.post('/home',(req,res) => {
    if(req.body.username === 'admin' && req.body.password === 'pass'){
        res.json('succes');
    }else {
        res.status(400).json('error logging in');
    }
})

app.post('/adduser',(req,res)=>{
    const {username, password} = req.body;
    db('users')
        .returning('*')
        .insert({
            username: username,
            password: password
        })
            .then(user => {
                res.json(user[0]);
            })
            .catch(err => res.status(400).json('unable to adduser'))
})

app.get('/view-users-page',(req,res)=>{
    db.select('*').from('users')
    .then(users =>{
        res.json(users)
    })
    
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000'); 
})

