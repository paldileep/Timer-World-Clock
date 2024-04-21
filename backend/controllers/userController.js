const userModel = require("../models/userModel")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => { 
    try {

      const { name, email, password } = req.body
      console.log("body-->", req.body)
      if(!name) 
          return res.status(400).json({message: "no name provided", token: null})

      if(!email) 
          return res.status(400).json({message: "no email provided", token: null})

      if(!password) 
        return res.status(400).json({message: "no password provided", token: null})

      const alreadyExist = await userModel.findOne({email: email})
      if(alreadyExist){
          return res.status(400).json({message: "user already exist", token: null})
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new userModel({
          name: name, 
          email: email, 
          password: hashedPassword
      })

      const userCreated = await newUser.save()
      if(!userCreated)
        return res.status(500).json({message: "user creation failed"})

      // Generate JWT token
      const token = jwt.sign({ userId: userCreated._id }, JWT_SECRET_KEY, { expiresIn: '10h' });

      return res.status(200).json({message: "user created successfully", token: token}) 

    } catch (error) {
      return res.status(500).json({error:error.message})
    }
}

exports.login = async (req, res) => { 
  try {

    const { email, password } = req.body
    if(!email) 
        return res.status(400).json({message: "no email provided", token: null})

    if(!password) 
      return res.status(400).json({message: "no password provided", token: null})

    const userExist = await userModel.findOne({email: email})
    if (!userExist) {
      return res.status(401).json({ message: 'Invalid email or password', token: null});
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, userExist.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password',token: null });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: userExist._id }, JWT_SECRET_KEY, { expiresIn: '10h' });

    return res.status(200).json({message: "successfully logged in", token: token, name: userExist.name})

  } catch (error) {
      return res.status(500).json({error:error.message})
  }
} 


