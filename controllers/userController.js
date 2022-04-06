const createError = require("http-errors");
const jsonwebtoken = require("jsonwebtoken");
const Joi = require("joi");
const bcryptjs = require("bcryptjs");
const sgMail = require('@sendgrid/mail');

const User = require("../models/User");
const { updateOne } = require("../models/User");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  login: async (req, res, next) => {
    try {
      
      const schema = Joi.object({
        username: Joi.alternatives(
          Joi.string().alphanum().min(5).max(255).required(),
          Joi.string().email().min(10).max(255).required()
        ),

        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      });

      const { value, error } = schema.validate(req.body);
      if (error) return next(createError(400, error.message));

      const user = await User.findOne().or([{ email: value.username },{username: value.username}]);
      if (!user)
        return next(createError(400, "Username and password is invalid"));

      console.log(value.username);
      // db connection
      const isPasswordMatched = await bcryptjs.compareSync(value.password,user.password); // hash will be comes from db
      if (!isPasswordMatched)
        return next(createError(400, "Username and password is invalid"));

      const token = jsonwebtoken.sign(
        {
          data: user, // user object
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
      );

      res.header('x-auth-token',token);
      res.success({
        token: token,
        user: user,
      });
      
    } catch (error) {
      return next(createError(500, error.message));
    }
  },
  signup: async (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(5).max(255).required(),
      username: Joi.string().min(5).max(255).required(),
      email: Joi.string().min(5).max(255).required(),
      password: Joi.string().min(5).max(255).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return next(createError(400, error.message));

    const user = await User.findOne({ email: req.body.email });
    if (user) return next(createError(400, "user already exists"));

    try {
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      const salt = await bcryptjs.genSalt(10);
      const hashed = await bcryptjs.hash(newUser.password, salt);

      newUser.password = hashed;
      const addUser = await newUser.save();

      res.success(addUser);
    } catch (error) {
      return next(createError(500, error.message));
    }
  },
  forgotpassword: async (req, res, next) => {
     const {email} = req.body.email;
     const user= User.findOne({where:{email}});
    
     if(!user) return next(createError(500,'User not found'));
    const link = `http://localhost:4000/reset-password/${user.id}/${token}`;
    const msg = {
        to: 'email',
        from: 'himanshi.kaundal@tothenew.com', 
        subject: 'Password re-set email',
        
        html: `<strong>click the link to reset the password ${link} </strong>`,
      };
      
      sgMail
        .send(msg)
        .then(() => {}, error => {
          console.error(error);
      
          if (error.response) {
            console.error(error.response.body)
          }
        });
    

    const secret = process.env.RESET_PASSWORD_KEY + user.password;
    const payload = { email: user.email, id: user.id };
    const token = jsonwebtoken.sign(payload, secret, { expiresIn: "20m" });
  },
  editProfile: async(req,res,next)=>{
    const schema = Joi.object({
      name: Joi.string().min(5).max(255).required(),
      email: Joi.string().min(5).max(255).required(),
      profilePicture:Joi.string().max(1),
      coverPicture:Joi.string().max(1),
      headline:Joi.string().max(255),
      state:Joi.string().max(20),
      country:Joi.string().max(20),
      city:Joi.string().max(20),
      website:Joi.string().max(50),
      gender:Joi.string,
      dob:Joi.date()

      
    });
    const { error,value } = schema.validate(req.body);
    if (error) return next(error);
    try{
      const result =await User.findByIdAndUpdate(req.params.id,value ,{new:true});
      await result.save();
    res.success(result);
    }catch(error){
      return next(createError(500, error.message));
    }
    
    
  },
  getMe: async(req,res,next) =>{
    const mydetails = await User.find().select('-password');
    res.success(mydetails);


  },
  changePassword: async(req,res,next)=>{
    try {

      const schema = Joi.object({
        oldPassword:Joi.string().required(),
        newPassword:Joi.string().required(),
        confirmPassword:Joi.any().valid(Joi.ref('newPassword')).required()
        
      });
      const {error,value}=schema.validate(req.body);
  
      const token = req.header('x-auth-token');
      const decoded = jsonwebtoken.verify(token,'SocialMedia');
      req.user=decoded;
      const currentUser = req.user;
      if(bcryptjs.compare(value.oldPassword,currentUser.password))
      {
        const salt = await bcryptjs.genSalt(10);
        const hashed = await bcryptjs.hash(value.newPassword, salt);
        await User.updateOne({_id:currentUser._id},{password:hashed})

        const userData= await User.findOne({_id:currentUser._id})

        const secret = process.env.RESET_PASSWORD_KEY +value.newPassword ;
    
        const payload = userData;
        const token = jsonwebtoken.sign(payload, secret, { expiresIn: "20m" });
        
        res.success({
          token: token,
          user: userData,
        });

      }
      else{
        return next(createError(500, error.message));
      }
  
      
    } catch (error) {
      return next(createError(500, error.message));      
    }
    
  }
};