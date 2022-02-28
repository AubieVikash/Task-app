const mongodb =     require('mongodb')
const express =     require('express');
const app=          express();
const MongoClient = mongodb.MongoClient;


const connectionURL = `mongodb+srv://AubieVikash:Aubergine2022@cluster0.bdpkh.mongodb.net/test`
const databaseName = 'task-manager'

//mongodb connection
MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client)=>{
    if(error){
        return console.log('unable to connect to database')
    }

    const db = client.db(databaseName)

    //CREATE OPERATIONS- MONGODB

    // db.collection('users').insertOne({
    //     name: 'Vikash',
    //     age: 21
    // }, (error, result)=>{
    //     if(error){
    //         console.log('Unable to insert user')
    //     }

    //     console.log(result)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'abc',
    //         age: 22
    //     },{
    //         name: 'xyz',
    //         age: 25
    //     }
    // ], (error, data)=>{
    //     if(error){
    //         return console.log('unable to insert the elements')
    //     }

    //     console.log(data);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         task: 'clean your desk',
    //         frequency: 2
    //     },{
    //         task: 'join scrum',
    //         frequency: 5
    //     },{
    //         task: 'report team lead',
    //         frequency: 3
    //     }
    // ], (error, data)=>{
    //     if(error){
    //         return console.log('unable to insert tasks')
    //     }

    //     console.log(data)
    // });

    
    
    //READ OPERATIONS - MONGODB

    // db.collection('users').findOne({ name: 'Vikash' }, (error, user)=>{
    //     if(error){
    //         return console.log('Unable to fetch document')
    //     }

    //     console.log(user)
    // });







    console.log('connected successfully')
});


app.get('',(req, res)=>{
    res.send('Hello from TASK_APP');
})


//server port setup and connection
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`server up and running on http://localhost:${port}`);
})
