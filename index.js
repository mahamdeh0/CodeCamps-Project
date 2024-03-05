require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000;
app.use(express.json());

const appRouter = require('./modules/index.router');
const { connectDB } = require('./DB/connection');
const BaseUrl=process.env.BaseUrl;
connectDB();

app.use(`${BaseUrl}/Teacher`,appRouter.TeacherRouter);
app.use(`${BaseUrl}/User`,appRouter.userRouter);
app.use(`${BaseUrl}/Admin`,appRouter.adminRouter);

app.get('*',(req,res)=>{
    res.json({message:"404 Page Not Found"})
});
 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))







 




