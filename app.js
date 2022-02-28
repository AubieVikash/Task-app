const express =     require('express');
const app=          express();




app.get('',(req, res)=>{
    res.send('Hello from TASK_APP');
})


//server port setup and connection
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`server up and running on http://localhost:${port}`);
})
