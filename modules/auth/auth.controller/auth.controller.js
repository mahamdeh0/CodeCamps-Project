let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const { userModel } = require("../../../DB/model/user.model");
const { teacherModel } = require("../../../DB/model/Teacher.model");


const Login = async (req, res) => {
    const { email, password, role } =  req.query;
  
    const Model = role === 'user' ? userModel : teacherModel;
    const roleDisplayName = role === 'user' ? 'User' : 'Teacher'; 
    
    try {
      const account = await Model.findOne({ email });
  
      if (!account) {
        return res.status(404).json({ message: `Invalid account for ${roleDisplayName}` });
      }
  
      if (!account.confirmEmail) {
        return res.status(400).json({ message: `Please confirm your email first as a ${roleDisplayName}` });
      }
  
      const match = await bcrypt.compare(password, account.password);
  
      if (!match) {
        return res.status(400).json({ message: `Invalid password for ${roleDisplayName}` });
      }
  
      const token = jwt.sign({ id: account._id }, process.env.logintoken, { expiresIn: 60 * 60 * 24 });
  
      return res.status(200).json({ message: `Done signing in as ${roleDisplayName}`, token });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: `An error occurred during ${roleDisplayName} login`, error: error.message });
    }
  };

module.exports={Login}