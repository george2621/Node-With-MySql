const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hackmyfuture',
    database: 'just_test'
    // port : xxxx // Uncomment this line and replace xxxx with the selected port number if you are not using default 3306. I also suggest to download MySQL version 5.7 because recent versions has authentication problems
});


connection.connect((err) => {
    if (err) throw err
    console.log("MySql Connected .. ");
});

const app = express();

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE just_test';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Database Created..')
    })
})


//Create Table 
app.get('/createposttable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255),body VARCHAR(255), PRIMARY KEY(id))';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post table created..');
    })
})

//Insert post1 
app.get('/addpost2', (req, res) => {
    let post = { title: 'Post TWo ', body: 'This is post number two ' };
    let sql = 'INSERT INTO posts SET ?';
    connection.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post is inserted..');
    });
})

app.get('/addpost3', (req, res) => {
    let post = { title: 'Post Three', body: 'This is post number three ' };
    let sql = 'INSERT INTO posts SET ?';
    connection.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post is inserted..');
    });
})

//Select Post
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts fetched..');
    });
})

//Select Post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id=${req.params.id}`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post fetched..');
    });
})


//Update post
app.get('/updatepost/:id', (req, res) => {
    // let newTitle = 'Updated title';
    let sql = `UPDATE posts SET ? WHERE id=${req.params.id}`;
    let post = { title: "return title" }
    connection.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post updated..');
    });
})

//Update post
app.get('/modifypost/:id', (req, res) => {
    let newTitle = 'Updated title';
    let sql = `UPDATE posts SET title='${newTitle}' WHERE id=${req.params.id}`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post updated..');
    });
})

//Delete post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts  WHERE id=${req.params.id}`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post deleted..');
    });
})

app.listen(3000, () => console.log("Server started on port 3000"))