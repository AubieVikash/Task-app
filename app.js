const {MongoClient, ObjectId} =     require('mongodb')
const express =     require('express');
const app=          express();


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
    //     age: 25
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

    // db.collection('users').find({ name: 'Vikash'}).toArray((error, users)=>{
    //     if(error){
    //         console.log(error)
    //     }

    //     console.log(users);
    // })



    //UPDATE OPERATIONS - MONGODB

    // db.collection('users').updateOne({
    //     _id: new ObjectId("621c9d0bc45510049ad0a4d7")
    // },{
    //     $set: {
    //         name: 'Mike'
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     filters
    // },{
    //     $set: {
    //         fields
    //     }
    // }).then((result)=>{

    // }).catch((error)=>{

    // })





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
