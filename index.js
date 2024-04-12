require('dotenv').config()
const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const app = express()
const port = 3000;
app.use(express.json({ limit: '50mb' }));

const appRouter = require('./modules/index.router');
const { connectDB } = require('./DB/connection');
const BaseUrl=process.env.BaseUrl;
connectDB();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(`${BaseUrl}/Teacher`,appRouter.TeacherRouter);
app.use(`${BaseUrl}/User`,appRouter.userRouter);
app.use(`${BaseUrl}/Admin`,appRouter.adminRouter);

app.use('*',(req,res)=>{
    res.json({message:"404 Page Not Found"})
});    


   
app.listen(port, () => {console.log(`Example app listening on port ${port}!`)})

 





 




