let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const { userModel } = require("../../../DB/model/user.model");
const { courseModel } = require("../../../DB/model/course.model");
const { SubscriptionModel } = require("../../../DB/model/subscription.model");
const { ReviewModel } = require("../../../DB/model/review.model");

const userSignup = async (req,res)=>{


    const {name,email,password,age,gender}= req.body;

    try{
    const user = await userModel.findOne({email:email});

    if(user){

        res.status(409).json({message:"email exist"})
    }else{

        const hashPassword = await bcrypt.hash(password,parseInt(process.env.saltRound));
        const newUser = new userModel({email:email,userName:name, password:hashPassword,age:age,gender:gender});
        const savedUser = await newUser.save();

        if(!savedUser){
            res.status(400).json({message:"fail to signup"});
        }else{
            res.status(201).json({message:"done signUp"});
        }
    }}catch{
        res.status(400).json({err:error.message})


    }

}
 
const userLogin = async (req,res)=>{

    const{email,password} = req.body;
    try{
    const user = await userModel.findOne({email});

    if(!user){
        res.json({message:"invalid account"});
    }else{

        const match = await bcrypt.compare(password,user.password);

        if(!match){

            res.json({message:"invalid password"});


        }else{
            const token = jwt.sign({id:user._id},process.env.logintoken,{expiresIn:60*60*24});


            res.json({message:"done signin ",token});


        }

    }}catch{
            res.json({message:"done signin ",token});

    }


}

const subscribeToCourse = async (req, res) => {
    const { courseId } = req.body; 
    const userId = req.user._id; 

    try {
        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const existingSubscription = await SubscriptionModel.findOne({ user: userId, course: courseId });
        if (existingSubscription) {
            return res.status(400).json({ message: "User is already subscribed to this course" });
        }

        const subscription = await SubscriptionModel.create({ user: userId, course: courseId });
        res.status(201).json({ message: "Subscription successful", subscription });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const viewSubscribedCourses = async (req, res) => {
    const userId = req.user._id; 

    try {
        const subscriptions = await SubscriptionModel.find({ user: userId }).populate('course');

        if (subscriptions.length === 0) {
            return res.status(404).json({ message: "No subscriptions found for the user" });
        }

        const subscribedCourses = subscriptions.map(subscription => {
            return {
                courseId: subscription.course._id,

            };
        });

        res.status(200).json({ subscribedCourses });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteCourse = async(req, res) => {

    const courseId = req.params.id;
    const userId = req.user._id;

    try {
        const deletedSubscription = await SubscriptionModel.findOneAndDelete({
            course: courseId,
            user: userId, 
        });

        if (!deletedSubscription) {
            return res.status(404).json({ message: "Subscription not found or already deleted" });
        }

        res.json({ message: "Subscription deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const submitReview = async (req, res) => {
    const { courseId, rating, comment } = req.body;
    const userId = req.user._id;

    try {
        const subscription = await SubscriptionModel.findOne({ user: userId, course: courseId, status: 'active' });
        if (!subscription) {
            return res.status(403).json({ message: "You must be subscribed and have attended the course to review it." });
        }

        const existingReview = await ReviewModel.findOne({ user: userId, course: courseId });
        if (existingReview) {
            return res.status(409).json({ message: "You have already submitted a review for this course." });
        }

        const course = await courseModel.findById(courseId).select('teacher admin');
        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }

        const review = await ReviewModel.create({
            user: userId,
            course: courseId,
            teacher: course.teacher, 
            rating,
            comment
        });

        res.status(201).json({ message: "Review submitted successfully", review });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



module.exports={userSignup,userLogin,subscribeToCourse,viewSubscribedCourses,deleteCourse,submitReview}