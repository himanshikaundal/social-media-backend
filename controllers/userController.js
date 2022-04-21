const createError = require("http-errors");
const jsonwebtoken = require("jsonwebtoken");
const Joi = require("joi");
const bcryptjs = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");

// const Token = require("../models/Token");
const User = require("../models/User");
const { updateOne } = require("../models/User");
const { invalid } = require("joi");
const { response } = require("express");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const client = new OAuth2Client(
  "1063994885267-fqtfvile5mkkl8vl9gkv15tvjqp45hkf.apps.googleusercontent.com"
);

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

      const user = await User.findOne().or([
        { email: value.username },
        { username: value.username },
      ]);
      if (!user)
        return next(createError(400, "Username and password is invalid"));

      console.log(value.username);
      // db connection
      const isPasswordMatched = await bcryptjs.compareSync(
        value.password,
        user.password
      ); // hash will be comes from db
      if (!isPasswordMatched)
        return next(createError(400, "Username and password is invalid"));
      delete user.password;
      const token = jsonwebtoken.sign(
        {
          data: user, // user object
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
      );

      res.header("x-auth-token", token);
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
      email: Joi.string().email().min(5).max(255).required(),
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

      const { email } = newUser;
      const msg = {
        to: email,
        from: "himanshi.kaundal@tothenew.com",
        subject: "Welcome to Buzz",

        html: `<strong> You have successfully created your account</strong>`,
      };

      await sgMail.send(msg);

      res.success(addUser);
    } catch (error) {
      return next(createError(500, error.message));
    }
    //fire email---->> new account created
  },
  forgotpassword: async (req, res, next) => {
    try {
      const schema = Joi.object({
        email: Joi.string().email().min(5).max(255).required(),
      });

      const { error } = schema.validate(req.body);
      if (error) return next(createError(400, error.message));

      const { email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) return next(createError(500, "User not found"));
      console.log(user);
      const token = crypto.randomBytes(48).toString("hex");

      const link = `http://localhost:3001/reset-password/${token}`;
      const msg = {
        to: email,
        from: "himanshi.kaundal@tothenew.com",
        subject: "Password re-set email",

        html: `<strong>click the link to reset the password ${link}</strong>`,
      };

      await sgMail.send(msg);

      const addToken = new Token({ email: email, token: token });
      addToken.save();

      res.success(null, "link has been successfully shared with you");
    } catch (error) {
      return next(createError(500, error.message));
    }
  },

  resetpassword: async (req, res) => {
    const schema = Joi.object({
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    const { value, error } = schema.validate(req.body);
    if (error) return next(createError(400, error.message));
    console.log(value);
    const password = value;
    const token = req.params.token;
    console.log(token);

    const istoken = Token.findOne({ token: token });
    if (!istoken) return next(createError(400, "token not found"));
    const { email } = istoken;

    var dateNow = new Date();
    if (!(istoken.expiry < dateNow.getTime() / 1000))
      return next(createError(400, "link is invalid"));

    const user = await User.findOne({ where: { email } });
    if (!user) return next(createError(400, "user not found"));

    const salt = await bcryptjs.genSalt(10);
    const hashed = await bcryptjs.hash(password, salt);

    user.password = hashed;
    const addUser = await user.save();

    res.success(addUser);
    // token ---->email, find and check whether token is expired or not
    // if token expire --> error -- link invalid
    // else find user from email
    // then hash new password and set it to user
    // email fire--->> password has been successfully changed
  },
  editProfile: async (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(5).max(255).required(),
      email: Joi.string().email().min(5).max(255).required(),
      profilePicture: Joi.string().max(1),
      coverPicture: Joi.string().max(1),
      headline: Joi.string().max(255),
      state: Joi.string().max(20),
      country: Joi.string().max(20),
      city: Joi.string().max(20),
      website: Joi.string().max(50),
      gender: Joi.string(),
      dob: Joi.date(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) return next(error);
    try {
      const result = await User.findByIdAndUpdate(req.params.id, value, {
        new: true,
      });
      await result.save();
      res.success(result);
    } catch (error) {
      return next(createError(500, error.message));
    }
  },
  getMe: async (req, res, next) => {
    const mydetails = await User.find().select("-password");
    res.success(mydetails);
  },
  searchUser: async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById({ _id: id });
      if (!user) return next(createError(400, "user not found"));
      res.success(user);
    } catch (error) {
      return next(createError(500, error.message));
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const schema = Joi.object({
        oldPassword: Joi.string().min(5).max(255).required(),
        newPassword: Joi.string().min(5).max(255).required(),
        confirmPassword: Joi.any().valid(Joi.ref("newPassword")).required(),
      });
      const { error, value } = schema.validate(req.body);
      const currentUser = req.loggedInUser;

      const userData = await User.findOne({ _id: currentUser._id });

      if (!(await bcryptjs.compare(value.oldPassword, currentUser.password))) {
        return next(createError(500, error.message));
      }

      const salt = await bcryptjs.genSalt(10);
      const hashed = await bcryptjs.hash(value.newPassword, salt);
      await User.updateOne({ _id: currentUser._id }, { password: hashed });
      res.success({
        token: token,
        user: userData,
      });
    } catch (error) {
      return next(createError(500, error.message));
    }
  },

  googleLogin: async (req, res, next) => {
    try {
      //receive token from frontend
      const { token } = req.body;
      const data = await client.verifyIdToken({
        idToken: token,
        audience:
          "1063994885267-fqtfvile5mkkl8vl9gkv15tvjqp45hkf.apps.googleusercontent.com",
      });
      console.log(data);

      const { email,name,given_name } = data.getPayload();
      console.log(email);
      User.findOne({email: email }).exec(async (err, user) => {
        if (user) {
          const token = jsonwebtoken.sign(
            {
              data: user, // user object
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY }
          );

          res.success({
            token: token,
            user: user,
          });
        } else {
          //new user
          
          let password = email + process.env.JWT_SECRET;
          let username = 'awesome' + given_name;
          const newuser = new User({
            name: name,
            username: username,
            email: email,
            password: password,
          });
          const user = await newuser.save();
          const token = jsonwebtoken.sign(
            {
              data: user, // user object
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY }
          );

          res.success({
            token: token,
            user: user,
          });
        }
      });
    } catch (err) {
      res.error(err);
    }
  },
};
